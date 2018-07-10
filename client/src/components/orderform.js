import React from 'react'
import InputMask from "react-input-mask"
import {withRouter} from 'react-router-dom'

class OrderForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            phone : '',
            email : ''
        }
    }

    onChange(event){
       console.log("changed:", event.target.name) 
    }
    render(){
        return (
            <div className="container">
                <form className="form-horizontal col-sm-8">
                <div className="form-group">
                    <label className="col-sm-2">ФИО</label>
                    <div className="col-sm-10">
                        <NameInput onChange={(e) => this.onChange(e)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2">Номер телефона</label>
                    <div className="col-sm-10">
                        <PhoneInput onChange={(e) => this.onChange(e)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2">Почта</label>               
                    <div className="col-sm-10">
                        <EmailInput onChange={(e) => this.onChange(e)}/>
                    </div>
                </div>    
                <span className="form-group">
                    <span className="col-sm-4 col-sm-offset-2">
                        <button className="btn btn-default form-control" type="button">Оменить</button>
                    </span>
                    <span className="col-sm-4 col-sm-offset-0">
                        <button className="btn btn-submit form-control" type="submit">Заказать</button>
                    </span>
                </span>            
                </form>
            </div>
        )
    }
}

const PhoneInput  = (props) => {
    return <InputMask 
                name={props.phone || "phone"} 
                mask={props.mask || "+7(999)999-99-99"} 
                className={"form-control " + props.classname || "phone"} 
                required 
                placeholder="Введите номер телефона" 
                maskChar={props.maskchar || "•"}
                onChange={props.onChange}
                />
}

const NameInput  = (props) => {
    return <input 
                name={props.email || "name"} 
                className={"form-control " + props.classname || "name"} 
                required 
                placeholder="Введите ФИО" 
                onChange={props.onChange}
                />
}

const EmailInput  = (props) => {
    return <input 
                name={props.email || "email"} 
                className={"form-control " + props.classname || "email"} 
                required 
                placeholder="Введите Email" 
                onChange={props.onChange}
                />
}
export default withRouter(OrderForm)