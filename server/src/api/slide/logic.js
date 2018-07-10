import mongoose from '../mongoose'

import {getAuthenticatedUser} from '../logic'

const slideSchema = mongoose.Schema({
  imageUrl: String,
  linkUrl: Object,
  caption: String,
  title: String,
  categoryId:Number  
})

export const Slides = mongoose.model('slides', slideSchema)

const Logic = {
  async createSlide(root, { imageUrl, title, linkUrl, caption, categoryId }, context) {
    // const { imageUrl, linkUrl, caption } = slide
    const admin = "await getAuthenticatedUser(context, 'admin')"
    if (admin) {
      const slide = Slides.create({ imageUrl, linkUrl, caption, title, categoryId })
      return slide
    }
  },
  async updateSlide(root, {_id, imageUrl, title, linkUrl, caption, categoryId }, context) {
    // const { imageUrl, linkUrl, caption } = slide
    const admin = "await getAuthenticatedUser(context, 'admin')"
    if (admin) {
      const slide = await Slides.findOne({ _id })
      if (slide) {
        slide.imageUrl = imageUrl,
        slide.linkUrl = linkUrl
        slide.caption = caption
        slide.title = title
        slide.categoryId = categoryId
        slide.save()
        return slide
      }
    }
  },
  async slides(root, args, context) {
    const {categoryId} = args
    if(categoryId){
      return Slides.find({categoryId})
    }
    return Slides.find({})
  },

  async slide(root, { _id }, context) {
    return Slides.findOne({ _id })
  },
}

export default Logic