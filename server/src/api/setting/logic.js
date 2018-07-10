import request from 'request'
import FeedParser from 'feedparser'
import mongoose from '../mongoose'
import {getAuthenticatedUser} from '../logic'

const settingSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  value: {
    type: String
  },
  cast: {
    type: String
  }
})

settingSchema.post('save', function(doc) {
  process.env[doc.name] = doc.value
  // console.log('%s has been saved', doc._id);
});

export const Settings = mongoose.model('settings', settingSchema);

const Logic = {
  async NBRate(root, args, context) {
    const admin = await getAuthenticatedUser(context, 'admin')
    if (admin) {
      return this
        .rssFeedRead()
        .catch((e) => {
          console.error(e)
          return Promise.reject(e);
        })
    }
  },
  async setSettings(root, args, context) {
    const admin = await getAuthenticatedUser(context, 'admin')
    let self = this;
    if (admin) {
      return Promise.all(args.map(item => this.setSetting(root, item, context)))
        .catch((e) => {
          console.error(e);
          return Promise.reject(e);
        })
    }
    self = null;
  },
  async setSetting(root, args, context) {
    const admin = await getAuthenticatedUser(context, 'admin')
    if (admin) {
      const {name, value, cast} = args
      // switch(cast){
      //   case 'string': {
      //     compareResult = typeof value === 'string';
      //     break;
      //   }
      //   case 'number': {
      //     compareResult = /^[0-9,.-]+$/g.test(value);
      //     break;
      //   }
      //   case 'boolean': {
      //     compareResult = value === 'true' || value === 'false';
      //     break;
      //   }
      //   default: {
      //     return Promise.reject(new Error("передан неизвестный тип преобразования"));
      //   }
      // }
      // if(!compareResult){
      //   return Promise.reject(
      //     new Error("указанный тип данных не соответствует по содержанию")
      //   );
      // }

      return Settings
        .findOne({name})
        .then((setting) => {
          if (!setting) {
            // return Settings.create({name, value, cast})
            return Settings.create({name, value})
          }
          setting.name = name;
          setting.value = value;
          // setting.cast = cast;
          return setting.save();
        })
        .then((setting) => {
          return setting.toObject();
        })
        .catch(e => {
          console.error(e);
          return Promise.reject(e);
        });
    }
  },
  async settings(root, args, context) {
    const {names} = args
    let query = names
      ? {
          name: {
            $in: names
          }
        }
      : {}
    return Settings
      .find(query)
      .catch(e => {
        console.error(e);
        return Promise.reject(e);
      });
  },
  async setting(root, { name }, context){
    if(process.env[name]){
      return process.env[name]
    }
    const setting = await Settings.findOne({ name })
    if (setting) {
      process.env[name] = setting.value
      return setting.value
    }
  },
  async updateSetting(name, value){
    return Settings.findOneAndUpdate({
        "name": name
      }, {
        "$set": {
          "value": value
        }
      })
      .catch(e => {
        console.error(e);
        return Promise.reject(e);
      })
  },
  rubToDb(){
    var self = this;
    self
      .rssFeedRead()
      .then((feed) => {
        return self.updateSetting("RUB", feed.rate.toString())
      })
      .then((rate) => {
        console.log(`The NB Task was completed at ${new Date()}`);
      })
      .catch((e) => {
        console.error("Error Report by runNationalBankTask>", e.message)
      })
  },
  rssFeedRead () {
    var req = request('http://www.nationalbank.kz/rss/rates_all.xml')
    var feedparser = new FeedParser();
    
    let rssReadPromise = new Promise((resolve, reject) => {
        let nationalBank = {};

        req.on('error', function (error) {
          reject(new Error("Произошла Ошибка при подключении к серверу Нац.банка=>", error.message));
        });
        
        req.on('response', function (res) {
          var stream = this; // `this` is `req`, which is a stream 
        
          if (res.statusCode !== 200) {
            reject(new Error("Статус ответа " + res.statusCode 
            + " не позволяет получить данные по текущим курсам валют НацБанка РК"))
          }
          else {
            stream.pipe(feedparser);
          }
        });
        
        feedparser.on('error', function (error) {
          reject(new Error("Произошла Ошибка при чтении RSS-ленты=>", error.message));
        });
        
        feedparser.on('readable', function () {
          // This is where the action is! 
          var stream = this; // `this` is `feedparser`, which is a stream 
          var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
          var item;
        
          while (item = stream.read()) {
            if (item.title == "RUB") {
              nationalBank["rate"] = parseFloat(item.summary);
            }
          }
        });

        feedparser.on('end', function () {
          req = feedparser = null;
          resolve(Object.keys(nationalBank).length > 0
            ? nationalBank
            : {
                rate: 0
              }
          );
        });

    })
    return rssReadPromise;
  }

}

export default Logic;