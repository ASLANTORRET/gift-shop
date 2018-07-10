import React from 'react'
import {withRouter} from 'react-router-dom'

class Delivery extends React.Component {
    constructor(props){
        super(props)
        const {cities, types} = props
        this.state = {
            city: cities[0].value,
            address:'',
            type:types[0].value,
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)        
    }          
    
    onChange(event){
        const name = event.target.name
        const value = event.target.value;
        console.log("onChange:", name)
        this.setState({
            [name] : value
        })
    } 
    onSubmit(event){

    }   
    onClick(event){
        // return to Order page
    }
        render(){
            return(
                <form className="form-horizontal">
                    <div className="form-group">
                        <p className="col-sm-4">Укажите город:</p>
                        <div className="col-sm-8">
                            <select className="form-control" name="city" defaultValue={this.state.city} onChange={this.onChange}>
                            {
                                this.props.cities.map((city, key)=>
                                    <option value={city.value} key={key}>{city.name}</option>
                                )
                            }
                                
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input 
                                type="text" 
                                value={this.state.address} 
                                onChange={this.onChange}
                                name="address"
                                className="form-control"
                                placeholder="Введите адрес" 
                                required />
                        </div>                            
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            {this.props.types.map((type, key)=>
                                <div className="radio" key={type.value} >
                                <label>
                                    <input 
                                        type="radio" 
                                        name="type" 
                                        onChange={this.onChange}
                                        value={type.value} defaultChecked={key === 0}/>
                                        {type.name}
                                </label>
                            </div>
                            )}
                        </div>
                    </div>
                    <legend/>
                    {/* <div className="form-group">
                        <span className="col-sm-6">
                            <button className="form-control btn btn-default" type="button">Продолжить</button>
                        </span>
                        <span className="col-sm-6">
                            <button className="form-control btn btn-submit" type="submit">Заказать</button>
                        </span>
                    </div> */}
                </form>
            )
        }            
}

export default withRouter(Delivery)