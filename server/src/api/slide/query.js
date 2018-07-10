import SlideLogic from './logic'

const Query = {
  slides(root, args, context) {
    return SlideLogic.slides(root, args, context)
  },
  slide(root, args, context) {
    return SlideLogic.slide(root, args, context)
  }
}

export default Query