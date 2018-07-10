import Code from './logic'

const Mutation = {
    async sendCode(root, {phone}, context){   
        const code = (Math.floor(Math.random() * 9999) + 1)
        console.log("code mutation:", code, "phone mutation:", phone)
        return Code.sendCode(root, {code, phone}, context)
    }
}

export default Mutation