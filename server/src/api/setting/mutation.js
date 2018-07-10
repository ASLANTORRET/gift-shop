import SettingLogic from './logic'

const Mutation = {
  async setSetting(root, {input}, context){
    return SettingLogic.setSetting(root, input, context)
  },
  async setSettings(root, {input}, context){
    return SettingLogic.setSettings(root, input, context)
  }
  
}

export default Mutation;