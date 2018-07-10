import Code from './logic'

const Query = {
    async matchCode(root, args, context){
        const {code, phone} = args
        const result = await Code.code(root, {query:{code, phone}, sort:{sent_at:-1}}, context)
        console.log("result:", result)
        return (result) ? true : false
    }
}

export default Query