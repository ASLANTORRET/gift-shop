import React from 'react'

const createMarkup = (body) => {
  // console.log(body.replace(/<a ([^>]+?)/gi, "<h1"))
  // return {__html: body.replace(/(<a [^>]+?)>/gi, '$1 onClick="' )}
  return {__html: body}
}

const HtmlContent = ({ html }) => {
  return (
    <div dangerouslySetInnerHTML={createMarkup(html)} />
  )
}

export default HtmlContent