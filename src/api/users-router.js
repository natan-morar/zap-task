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

router.post("/", (req, res) => {
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