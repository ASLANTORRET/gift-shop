import mongo, { MongoClient } from 'mongodb'
import Grid from 'gridfs-stream'

const gridfs = function(req, res) {
  MongoClient.connect(process.env.MONGO_URL, (err, db) => {
    // db.open(function (err) {
      if (err) return handleError(err)
      var gfs = Grid(db, mongo)

      gfs
      .createReadStream({ _id: req.params['fileId'] })
      .on('error', function() {
          res.send(500, 'failed to retrieve file.')
      })
      .pipe(res)
    // })
  })
  // var db = new mongo.Db('empire', new mongo.Server("127.0.0.1", 27017, {}), {safe: false, strict: false})
  
  
}

export default gridfs