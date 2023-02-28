const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())



app.post(`/`, async (req, res) => {
  const { name, email, password } = req.body
  const result = await prisma.post.create({data: {name, email, password} })
  res.json({result})
})


app.get(`/:id`, async (req, res) => {
    const { id } = req.params
    const post = await prisma.post.findUnique({ where: { id: Number(id) } })
    res.json({post})
})


app.get('/list', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json({users})
})


app.delete(`/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({ where: { id: Number(id) } })
  res.json({post})
})






app.listen(3000, () =>
  console.log(`Server is running on http://localhost:3000`)
)
