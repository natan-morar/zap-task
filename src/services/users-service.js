import fs from 'fs'
import path from 'path'

import { DATA_DIR } from '../app.js'
import { parseCSVtoJSON } from '../lib/index.js'

const USERS_FN = "users.csv"


export const getUsers = () => {
  const fileBuffer = fs.readFileSync(path.join(DATA_DIR, USERS_FN))
  const users = parseCSVtoJSON(fileBuffer)
  return users
}

export const getUser = (userId) => {
  const users = getUsers()
  return users.find(u => u.id === userId)
}

export const createUser = (userData) => {
  const users = getUsers()
  const maxUserId = Math.max(...users.map(u => u.id))

  let dataStr = `\n${maxUserId+1}`
  Object.keys(userData).forEach(key => {
    dataStr += ","+userData[key]
  })

  fs.appendFileSync(path.join(DATA_DIR, USERS_FN), dataStr, (err) => {
    if (err) throw err
  })

  const updatedUsers = getUsers()
  return updatedUsers.at(-1)
}

