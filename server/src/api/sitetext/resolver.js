const Resolver = {
    SiteText:{
        title(root, { language }, context){
            switch(language){
                case 'EN':
                return root.title_eng
                case 'KZ':
                return root.title_kaz
                default:
                return root.title_rus
            }            
          }
    }
}

export default Resolver
