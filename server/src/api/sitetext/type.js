const Type = `
type SiteText{  
  title_rus:String,
  title_kaz:String,
  title_eng:String,
  title(language:String!): String,
  classname: String   
}
`
export default Type
