import mongoose from '../mongoose'

import {getAuthenticatedUser} from '../logic'

const SiteTextSchema = mongoose.Schema({
  title_rus: String,
  title_kaz: String,
  title_eng: String,
  classname:String  
})

export const SiteText = mongoose.model('text', SiteTextSchema)

const Logic = {  
  async texts(root, query, context) {
    return SiteText.find(query)
  },
  async text(root, query, context){
    return SiteText.findOne(query)
  }  
}

export default Logic