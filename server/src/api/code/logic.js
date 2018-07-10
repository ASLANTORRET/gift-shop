import mongoose from 'mongoose'
import request from 'request'

const CodeSchema = mongoose.Schema({
    code:Number,
    sms_id:String,
    sent_at:Date,
    result:JSON,
    phone:String    
})

export const Code = mongoose.model('codes', CodeSchema)
//todo: add sms text 
const Logic = {
    async sendCode(root, {code, phone}, context){
        console.log("code:", code, "phone", phone)
        const api_key = "5mpd8zg7f7y358g5twndq9yoqjrzwp1mpgmocquy"
        request.get(`https://api.unisender.com/ru/api/sendSms?format=json&api_key=${api_key}&phone=${phone}&sender=Empire&text=${code}`,
        (error, response, body)=>{
            if(error){
                console.log("Error:", error)
            }
            if(body){
                const {result, result:{phone, sms_id}} = JSON.parse(body)
                Code.create({code, phone, sent_at:new Date, sms_id, result})   
            }
        }    
        )
        return true        
    },

    async code(root, {query, sort},context){
        const {code, phone} = query
        return Code.findOne({code, phone}).sort(sort)
    }    
}

export default Logic