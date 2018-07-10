import SettingLogic from './logic'

const Query = {
    async NBRate (root, args, context) {
        return await SettingLogic.NBRate(root, args, context)
    },
    async settings (root, args, context) {
        return await SettingLogic.settings(root, args, context)
    }
}

export default Query;