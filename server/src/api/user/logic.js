import mongoose from '../mongoose'

import crypto from 'crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '~/config'

import { getAuthenticatedUser } from '../logic'

// const hotelSchema = mongoose.Schema({},{strict: false})
const usersSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  fullname: String,
  username: String,
  phone:String,
  version: Number,
  roles: [String],
  jwt: String,
  // cart: {
  //   astrum: [{astrum_id: Number, quantity: Number}],
  //   oasis: [{oasis_id: String, quantity: Number}],
  // },
})

export const Users = mongoose.model('newusers', usersSchema)

const Logic = {
  login(root, args, context) {
    const { email, password } = args
    return Users.findOne({
      // 'emails.address': email
      email
    }).then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password).then((res) => {
        // const pass256 = crypto.createHash('sha256').update(password).digest('hex')
        // return bcrypt.compare(pass256, user.services.password.bcrypt).then((res) => {
          if (res) {
            // const { _id, email } = user
            const token = jwt.sign({
              _id: user._id,
              email: user.email,
              version: user.version,
            }, JWT_SECRET)
            user.jwt = token
            context.user = Promise.resolve(user)
            return user
          }
          return Promise.reject('no password')
        })
      }
      return Promise.reject('no email')
    })
  },

  signup(root, args, context) {
    const { email, password, fullname, phone } = args
    return Users.findOne({
      email
    }).then((existing) => {
      if (!existing) {
        return bcrypt.hash(password, 10).then((hash) => {
          Users.create({
            email,
            password: hash,
            fullname,
            phone,
            version: 1,
          }).then((user) => {
            const { _id } = user
            const token = jwt.sign({ _id, email, phone, version: 1 }, JWT_SECRET)
            user.jwt = token
            context.user = Promise.resolve(user)
            return user
          }).catch(error => {
            console.log(error)
          })
        })
      }
      return Promise.reject('email exists')
    })
  },
  async createUser(root, args, context) {
    const admin = await getAuthenticatedUser(context, 'admin')
    if (admin) {
      const { email, password, roles, organizationId } = args
      const existing = await Users.findOne({
        email
      })
      if (!existing) {
        const hash = await bcrypt.hash(password, 10)
        if (hash) {
          // const user = new Users()
          // user.email = email
          // user.password = hash
          // user.roles = roles
          // user.version = 1
          // user.organizationId = organizationId || null
          // user.save()
          const user = Users.create({
            email, 
            password: hash,
            roles,
            version: 1,
            organizationId: organizationId || null,
          })
          if (user) {
            return user
          } else {
            return Promise.reject('error')
          }
        } else {
          return Promise.reject('error')
        }
      } else {
        return Promise.reject('email exists')
      }
    }
  },
  async updateUser(root, args, context) {
    const admin = await getAuthenticatedUser(context, 'admin')
    if (admin) {
      const { _id, email, password, roles, organizationId } = args
      const existing = await Users.findOne({
        email,
        _id: { $ne: _id }
      })
      if (!existing) {
        const user = await Users.findOne({_id})
        if (password) {
          const hash = await bcrypt.hash(password, 10)
          if (hash) {
            user.password = hash
            user.version = user.version+1
          } else {
            return Promise.reject('error')
          }
        }
        user.email = email
        user.roles = roles
        user.organizationId = organizationId || null
        user.save((err) => {
          console.log(err)
        })
        return user
      } else {
        return Promise.reject('email exists')
      }
    }
  },
  async users(root, { query }, context) {
    const admin = await getAuthenticatedUser(context, 'admin')
    if (admin) {
      return Users.find(query)
    }
  },
  async user(root, { query }, context) {
    const admin = "await getAuthenticatedUser(context, 'admin')"
    if (admin) {
      return Users.findOne(query)
    }
  },
}

export default Logic