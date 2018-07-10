import React from 'react'
import { Link } from 'react-router-dom'
const Home = ( { user } ) => {
  return (
    <div>
      <link rel="stylesheet" href="css/home.css" />
      <div className="home_container">
        <div className="row empire_clear_fix">
          <div>
            <img id="empire_logo" src="img/imgpsh_fullsize.png"/>
          </div> 
        </div> 
        <div className="row empire_clear_fix">
          <h3 className="text-center">Добро пожаловать на торговую площадку Empire!</h3>
        </div> 
        <div className="row empire_clear_fix">  
          <div className="text-center">
            <p>
              {/* <Link to={`/shop`}><img src="img/shop.jpg" alt="Магазин"/></Link>
              <Link to={`/manager`}><img src="img/manager.jpg" alt="Менеджер"/></Link>
              <Link to={`/supervisor`}><img src="img/supervisor.jpg" alt="Супервизор"/></Link>
              <Link to={`/admin`}><img src="img/admin.jpg" alt="Админ"/></Link> */}
              <Link to={`/login`}>Login</Link>|
              <Link to={`/signup`}>Signup</Link>
              {user && user.roles && user.roles.indexOf('client') !== -1 ? <Link to={`/shop`}><img src="img/shop.jpg" alt="Магазин"/></Link> : null}
              {user && user.roles && user.roles.indexOf('manager') !== -1 ? <Link to={`/manager`}><img src="img/manager.jpg" alt="Менеджер"/></Link> : null}
              {user && user.roles && user.roles.indexOf('supervisor') !== -1 ? <Link to={`/supervisor`}><img src="img/supervisor.jpg" alt="Супервизор"/></Link> : null}
              {user && user.roles && user.roles.indexOf('admin') !== -1 ? <Link to={`/admin`}><img src="img/admin.jpg" alt="Админ"/></Link> : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home