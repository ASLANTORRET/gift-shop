import TextLogic from './logic'

const Query = {
    sitetexts(root, args, context) {
        const { classnames } = args
        return TextLogic.texts(root, { classname: {$in: classnames} }, context)
    },
    sitetext(root, args, context) {
        const { _id } = args
        return TextLogic.text(root, { _id }, context)
    }        
}

export default Query