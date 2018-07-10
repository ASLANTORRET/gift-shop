import request from 'request'

const Logic = {

  oauth( callback=() => {} ) {
    const { OAUTH } = process.env
    if (! OAUTH) {
      this.updateOauth(callback)
    } else {
      callback(JSON.parse(OAUTH))
    }
  },
  updateOauth(callback) {
    return request.post('http://api.empire.kz/oauth/token',
      { form: {
        grant_type: 'client_credentials',
        client_id: process.env.EMPIRE_API_CLIENT_ID,
        client_secret: process.env.EMPIRE_API_CLIENT_SECRET,
      }},
      (error, response, body) => {
        process.env['OAUTH'] = body
        callback(JSON.parse(process.env['OAUTH']))
      }
    )
  }
}

export default Logic