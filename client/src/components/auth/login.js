import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { LOGIN_MUTATION } from '../../mutations/user'
import { setUser } from '../../actions/user'
import $ from 'jquery'

class LoginForm extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isCorrect: true
    }   
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state
    this.props.login({ email, password}, ()=>{this.setState({"isCorrect":false})})
  }
  render() {
    return (      
        <form onSubmit={this.onSubmit}>
          <div className={"form-group row " + (!this.state.isCorrect && "has-error")}>
            <label htmlFor="email" className="col-sm-2 col-form-label">Почта</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="email" name="email" placeholder="Введите Email" onChange={e => {this.setState({email: e.target.value})}} value={this.state.email} required/>
            </div>
          </div>
          <div className={"form-group row " + (!this.state.isCorrect && "has-error")}>
            <label htmlFor="password" className="col-sm-2 col-form-label">Пароль</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="password" name="password" placeholder="Введите пароль" onChange={e => {this.setState({password: e.target.value})}} value={this.state.password} required/>
            </div>
          </div>
          {
            !this.state.isCorrect && <div className="form-group">
            <div className="alert alert-danger" role="alert">
                <strong>Некорректные данные. Попробуйте снова.</strong>
                <Link to={`recover`} class="alert-link">Забыли пароль ?</Link>
            </div>          
          </div>
          }
          
          <div className="form-group row">
            <div className="text-center">
              <button type="submit" className="btn btn-submit">Авторизоваться</button>
            </div>
          </div>
        </form>
    )
  }
}

const withState = connect(
  null,
  (dispatch) => ({
    setCurrentUser({_id, roles}) {
      dispatch(setUser({_id, roles}))
    }
  })
)

const withMutation = graphql( LOGIN_MUTATION, {
  props: ({ mutate, ownProps: { history, setCurrentUser } }) => ({
    async login ({email, password}, callback) {
      try{
        const result = await mutate({
          variables: { input: { email, password } },
        })
        if (result) {
          const { data: { login } } = result
          if (login && login.jwt) {
            localStorage.setItem('token', login.jwt)
            setCurrentUser(login)
            history.push('/')
          }          
        }
      }
      catch(e){
        callback()
      }
    }
  })
})

export default withRouter(withState(withMutation(LoginForm)))