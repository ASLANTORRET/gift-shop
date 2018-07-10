const Resolver = {
  AstrumProduct: {
    // async children(root, args, context) {
    //   return Products.find({parentId: root._id})
    // }
    pictures(root, args, context){
      return root.pictures.map(picture => {
        if (picture !== 'images/.jpg')
          return 'http://92.46.43.37/shuttle.dll/Picture?type=1&key='+picture
      })
    },
    name(root, args, context){
      const {language} = args
      switch(language){
        case 'EN':
          return root.name_eng
        case 'KZ':
          return root.name_kaz
        default:
          return root.name_rus
    }},
    material(root, args, context){
      const {language} = args
      switch(language){
        case 'EN':
          return root.material_eng
        case 'KZ':
          return root.material_kaz
        default:
          return root.material_rus
      }   
    },
    description(root, args, context){
      const {language} = args
      switch(language){
        case 'EN':
          return root.description_eng
        case 'KZ':
          return root.description_kaz
        default:
          return root.description_rus
      }   
    }      
  }
}

export default Resolver