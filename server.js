const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3001

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))

io.on('connection', socket => {
  console.log('A user connected')
  socket.on('disconnect', () => console.log('User disconnected'))
})

http.listen(PORT, () => console.log(`Running on port ${PORT}`))