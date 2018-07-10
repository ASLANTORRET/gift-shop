import React from 'react'

export default ({children, title}) => {
    return(
        <section className="container">
            <div style={{width:"750px", margin:"0 auto"}}>
                <h1 className="main-ttl">{title}</h1>
                {children}
            </div>    
        </section>
    ) 
}