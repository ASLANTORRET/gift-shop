import React from 'react'
import {graphql, compose, gql, withApollo} from 'react-apollo'
import {SIGNUP_MUTATION} from '../../mutations/user'
import InputMask from 'react-input-mask'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'
import {Link} from 'react-router-dom'
 
class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            timer : this.props.timer
        }        
        this.decrement = props.decrement
        this.prepend = props.prepend
        this.append = props.append
    }
    tick(){
        
        this.setState((prevState,props)=>({
            timer : prevState.timer - props.decrement
        }))
        
        if(this.state.timer == 0){
            clearInterval(this.timerID);
            this.props.isCompleted(true)
        }            
    }
    
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);        
    }
    
    render(){
        const date = (new Date(this.state.timer * 1000))
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        if(seconds < 10){
            seconds = "0" + seconds
        }
        if(minutes < 10){
            minutes = "0" + minutes
        }
        let result = []
        if(this.prepend){
            result.push(this.prepend)
                }        
        
        result.push(<div>{minutes + ":" + seconds}</div>)
        
        if(this.append){
            result.push(this.append)
        }
        return(      
            <div>{result}</div>     
        )            
    }
}

class SignupForm extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          password: '',
          password_repeat:'',
          fullname: '',
          phone:'',
          isCorrect:true,
          enableConfirm:false,
          isTimerCompleted: false,
          code: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
        this.changeTimer = this.changeTimer.bind(this)
        this.onCodeChange = this.onCodeChange.bind(this)
    }
    changeTimer(status){
        this.setState({
            "isTimerCompleted" : status
        })
    }  
    onCodeChange(e){
        const code = e.target.value
        const name = e.target.name
        let phone = this.state.phone
        phone = phone.replace(/[()\-\+]/g, "")
        console.log("codeL:", code)
        console.log("codeL:", phone)
        if(code.length >= 4){
            this.props.client.query({
                                query:MATCHCODE_QUERY,
                                variables:{code, phone}
                            })
            .then((data)=>{
                console.log("data:", data.data.matchCode)
                if(data.data.matchCode){
                    console.log("mactched:", data.matchCode)
                    this.setState({
                        [name]:true
                    })
                    $(".code.has-feedback span").hide()
                    $(".code.has-feedback").removeClass("has-error").addClass("has-success")
                }
                else{
                    $(".code.has-feedback").removeClass("has-success").addClass("has-error")
                    $(".code.has-feedback span").show()
                }            
            })
            .catch((e)=>console.log("Error match code:", e))         
        }
    }
    onSubmit(e) {
        e.preventDefault()
        const { email, password, fullname, phone, password_repeat, code } = this.state
        console.log("code state:", code)
        if(password_repeat === password && code){
            const phoneFormatted = phone.replace(/[()\-\+]/g, "")
            console.log("phone:", phoneFormatted)
            this.props.signup({ email, password, fullname, phone:phoneFormatted.toString()},(e)=>{this.setState({"isCorrect" : false});console.log("signup error:", e)})
        }
    }
    
    onClick(e){
        e.preventDefault()
        switch(e.currentTarget.name){
            case "show":
                if(this.props.sendCode({variables: { phone: this.state.phone.replace(/[()\-\+]/g, "")}})){
                    this.setState({
                        "enableConfirm" : true
                    }) 
                }
                break
            case "repeatCode":
                if(this.props.sendCode({variables: { phone: this.state.phone.replace(/[()\-\+]/g, "")}})){
                    this.changeTimer(false)               
                }
                break
            default:
                this.setState({
                    "enableConfirm" : false,
                    "code" : false
                })
                $("input[name='phone']").focusin()

        }
    }

    onChange(e){
        let value = e.target.value
        let name = e.target.name
        let correct = true
        switch(name){
            case "password_repeat":
            correct  = this.matchPassword(this.state.password, value)
            break
            case "email":
            correct = this.checkEmail(value)
            break
            case "phone":
            correct = this.checkPhone(value)
            break
            case "code":
            correct = this.matchCode(value, this.state.phone)
            break
        }  
        if(value.length && correct){
            $(e.currentTarget).closest(".form-group").removeClass("has-error").addClass("has-success")  
        } 
        else{
            value = ""
            $(e.currentTarget).closest(".form-group").removeClass("has-success").addClass("has-error")
        }          
        this.setState(
            {[name]: value}
        )    
    }
    
    matchPassword(origin, repeat){
        return repeat === origin
    }

    checkPhone(phone){
        const digits = phone.match(/\d/g)
        let length = 0
        length = digits && digits.length
        return length > 10;    
    }

    checkEmail(email){
        const matchedEmail = email.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/g)
        return matchedEmail && matchedEmail.length    
    }
    
    sendBtnText = (<span className="control-label">Нажмите <u>Отправить</u> для верификации номера</span> )
    
    render() {        
        return (
            <form onSubmit={this.onSubmit} className="signup-form">
                <div className="form-group row has-feedback">
                    <label htmlFor="fullname" className="col-sm-2 col-form-label control-label">ФИО</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="fullname" name="fullname" placeholder="Введите ФИО" onChange={this.onChange} aria-describedby="inputSuccess2Status" required/>
                        {
                            this.state.fullname != "" && 
                            <span className="glyphicon glyphicon-ok form-control-feedback" style={{position:'absolute', right:'12px'}} aria-hidden="true"></span>
                        }                    
                    </div>
                </div>        
                

                <div className={"form-group row has-feedback " + (this.state.code && "has-success")}>
                    <label htmlFor="phone" className="col-sm-2 col-form-label control-label">Номер телефона</label>
                    <div className="col-sm-8">
                        <InputMask name="phone" mask="+7(999)999-99-99" className="form-control phone" required placeholder="Введите номер телефона" maskChar="•" disabled={this.state.enableConfirm}  onChange={this.onChange}></InputMask>
                        {
                            this.state.code && 
                            <span className="glyphicon glyphicon-ok form-control-feedback" style={{position:'absolute', right:'12px'}} aria-hidden="true"></span>
                        }
                        {!this.state.enableConfirm && this.sendBtnText}              
                        
                    </div>

                    <span className="col-sm-2 col-sm-offset-0">
                    
                        {!this.state.enableConfirm 
                            ? (<button type="button" className="btn btn-submit" name="show" disabled={this.state.phone == ""} onClick={this.onClick}>Отправить</button>)
                            : (<span className="glyphicon glyphicon-pencil" name="hide" aria-hidden="true" title="Изменить номер" style={{cursor:'pointer'}} onClick={this.onClick}>изменить</span>)    
                        }
                        
                    </span>             
                </div>            
                
                {this.state.enableConfirm && !this.state.code &&
                    <div className="form-group row code has-feedback">
                        <label htmlFor="phone" className="col-sm-3 col-sm-offset-2 col-form-label">Код из SMS:</label>
                        <div className="col-sm-4">
                            <div className="input-group">
                                <InputMask type="text" name="code" mask="9999" maskChar="" className="form-control" placeholder="SMS code" onChange={this.onCodeChange}></InputMask>
                                <div className="input-group-btn">
                                    <button type="button" onClick={(e)=>{e.preventDefault();console.log("prevent:", e)}} className="form-control btn btn-submit">OK</button>                            
                                </div>                      
                            </div>   
                            <span className="message">Указан неверный код</span>                     
                        </div>                                            
                        
                        <div className="col-sm-3 text-center">                        
                            {this.state.enableConfirm && (!this.state.isTimerCompleted ?
                                <Timer 
                                    timer={180} 
                                    decrement={1} 
                                    prepend={<span>Отправка через:</span>} 
                                    isCompleted={this.changeTimer}/>
                                :
                                <button type="button" name="repeatCode" onClick={this.onClick} 
                                className="form-control btn btn-default">Повторить</button>)    
                            }
                        </div>
                    </div>
                }

                <div className="form-group row has-feedback">
                    <label htmlFor="email" className="col-sm-2 col-form-label control-label">Почта</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.onChange} required/>
                        {
                        this.state.email != "" && 
                        <span className="glyphicon glyphicon-ok form-control-feedback" style={{position:'absolute', right:'12px'}} aria-hidden="true"></span>
                        }
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-2 col-form-label control-label">Пароль</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password" placeholder="Введите пароль" onChange={this.onChange} required/>
                    </div>
                </div>
                <div className="form-group row has-feedback">
                    <label htmlFor="password_repeat" className="col-sm-2 col-form-label control-label">Повторите пароль</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control"  name="password_repeat" placeholder="Повторите ваш пароль" onChange={this.onChange} required/>
                        {
                            this.state.password_repeat != "" && 
                            <span className="glyphicon glyphicon-ok form-control-feedback" style={{position:'absolute', right:'12px'}} aria-hidden="true"></span>
                        } 
                    </div>
                </div>
                {!this.state.isCorrect && <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        <strong>Аккаунт уже существует.</strong>
                        <Link to={`recover`} className="alert-link">Забыли пароль ?</Link>
                    </div>          
                </div>}
                <div className="form-group row">
                    <div className="text-center">
                        <button type="submit" className="btn btn-submit">Зарегистрироваться</button>
                    </div>
                </div>
            </form>
        )
    }
}

  const SENDCODE_MUTATION = gql`
    mutation sendCode($phone:String!){
        sendCode(phone:$phone)
    }
  `
  const withMutation = compose(
    graphql(SIGNUP_MUTATION, { 
        props: ({ mutate, ownProps: { history} }) => ({
            async signup({email, password, fullname, phone},callback) {
                try{
                    const result = await mutate({
                        variables: { input: { email, password, fullname, phone } },
                    })
                    if (result) {          
                        history.push('/')
                    }
                }
                catch(e){
                    callback(e);
                }
            }
        }) }),
    graphql(SENDCODE_MUTATION, { name: 'sendCode'})
  )

  const MATCHCODE_QUERY = gql`
    query matchCode($code:Int!, $phone:String!){
        matchCode(code:$code, phone:$phone)
    }
  `

export default withRouter(withApollo(withMutation(SignupForm)))