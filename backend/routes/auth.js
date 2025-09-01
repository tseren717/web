import express from 'express'
import { signup, login, logout, getCurrentUser } from '../backend/service/loginService.js'

const router = express.Router()

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  try {
    const data = await signup(email, password)
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const data = await login(email, password)
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Logout
router.post('/logout', async (req, res) => {
  try {
    await logout()
    res.json({ message: 'Logged out successfully' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Current user
router.get('/me', async (req, res) => {
  try {
    const user = await getCurrentUser()
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
