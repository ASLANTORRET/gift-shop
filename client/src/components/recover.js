import React from 'react'
import {withRouter, Link} from 'react-router-dom'

const Recover = () => {
    
    return(
        <form className="form-horizontal col-sm-5">
            <div className="form-group">
                <label htmlFor="#email">Введите Email для получения инструкции по восстановлению пароля.</label>
                <input className="form-control" id="email" type="email" placeholder="Enter Email" required/>
            </div>
            <div className="form-group">
                <button className="btn btn-submit form-control" type="submit">Отправить</button>
                <Link to={`login`}>Уже есть аккаунт ? Авторизоваться</Link>
            </div>            
        </form>    
    )
}

export default withRouter(Recover)