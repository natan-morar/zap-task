import express from 'express'

import { getUser, getUsers, createUser } from '../services/users-service.js'

const router = express.Router()

router.get("/:userId", (req, res) => {
  const { userId } = req.params 
  const user = getUser(userId)

  if (!user) {
    res.status(404).end()
  }

  res.json(user)
})

/**
 * Basic Auth Middleware
 * 
 * based on https://stackoverflow.com/a/33905671/8040299
 */
const basicAuthMiddleware = (req, res, next) => {
  const auth = {login: 'admin', password: '123'} // magnificent security

  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  if (login && password && login === auth.login && password === auth.password) {
    return next()
  }

  res.status(401).end()
}

router.post("/", basicAuthMiddleware, (req, res) => {
  const userData = req.body

  const requiredKeys = [
    "first_name",
    "last_name",
    "email",
    "job_title",
    "star",
  ]

  if (JSON.stringify(Object.keys(userData)) !== JSON.stringify(requiredKeys)) {
    return res.status(400).send("Your data is no good 😢")
  }

  const users = getUsers()

  if (users.find(u => u.email === userData.email)) {
    return res.status(409).send("Conflict: email already exists 🤯")
  }

  const newUser = createUser(userData)

  res.status(201).json(newUser)
})

export default router