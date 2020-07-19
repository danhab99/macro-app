const WebSocket = require('ws')
const fs = require('fs')
const EventEmitter = require('events')
const { exec } = require('child_process')
const { program } = require('commander')
const express = require('express')
const http = require('http')

const api = express()
const server = http.createServer(api)

api.use(express.static('./build'))

program
  .option('-p --port <port>', 'Port to listen on', 8080)
  .requiredOption('-c --config <config>', 'File to button config')
  .parse(process.argv)

const wss = new WebSocket.Server({
  server
});

var config = JSON.parse(fs.readFileSync(program.config))
var configEvents = new EventEmitter()

fs.watchFile(program.config, (curr, prev) => {
  console.log('Config changed')
  config = JSON.parse(fs.readFileSync(program.config))
  configEvents.emit('change', config)
})

wss.on('connection', ws => {
  console.log('Client connected')
  const send = (topic, data) => ws.send(JSON.stringify({topic, data}))

  configEvents.on('change', config => send('config', config))

  ws.on('message', msg => {
    try {
      msg = JSON.parse(msg)
    }
    catch (e) {
      send('error', e)
    }

    console.log('Message received', msg)

    switch (msg.topic) {
      case 'get config':
        console.log('Sending config')
        send('config', config)
        break
      case 'click':
        console.log('Clicking')
        let cmd = config[msg.data.category][msg.data.index].cmd
        exec(cmd)
        break
      default:
        console.log('Invalid topic')
        send('invalid topic', msg.topic)
    }
  })
})

server.listen(program.port, '0.0.0.0', () => console.log(`Listening on port ${program.port}`))