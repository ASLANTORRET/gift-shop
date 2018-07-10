import { Products } from './connector'
import { Files } from '../file/connector'
import _ from 'lodash'
const Resolver = {
  Product: {
    // async children(root, args, context) {
    //   return Products.find({parentId: root._id})
    // }
    async images(root, args, context) {
      let { type } = args
      type = type || 'original'
      if (root.fileIds && root.fileIds.length) {
        const files = await Files.find({_id: {$in:root.fileIds}})
        const gridFsIds = root.fileIds.map(_id => {
          const file = _.find(files, {_id})
          if (file && file.versions && file.versions[type]) {
            return file.versions[type].meta.gridFsFileId
          }
        }).filter(file => file)
        return gridFsIds.map(id=>process.env.CDN_URL + id)
      } else {
        return []
      }
      
    }
  }
}

export default Resolver