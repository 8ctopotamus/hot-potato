const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3001

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))

const players = {}

io.on('connection', socket => {
  console.log(`${socket.id} connected`)
  players[socket.id] = {
    playerId: socket.id,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
  }

  socket.emit('currentPlayers', players)

  socket.broadcast.emit('newPlayer', players[socket.id])

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
    delete players[socket.id]
    io.emit('disconnected', socket.id)
  })
})

http.listen(PORT, () => console.log(`Running on port ${PORT}`))