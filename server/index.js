#!/usr/bin/env node
const WebSocket = require('ws')
const fs = require('fs')
const EventEmitter = require('events')
const { exec } = require('child_process')
const { program } = require('commander')
const express = require('express')
const { join } = require('path')


const api = express()
api.use(
  express.static(join(__dirname, '../', 'app', 'build')),
  (req, res) => {
    res.redirect('/')
  }
  )

program
  .option('-p --port <port>', 'Port to listen on', 8080)
  .requiredOption('-c --config <config>', 'File to button config')
  .parse(process.argv)

api.listen(program.port, '0.0.0.0', () => console.log(`Listening on port ${program.port}`))

const readConfig = () => JSON.parse(fs.readFileSync(program.config))

const validateConfig = config => {
  for (let [key, value] of Object.entries(config)) {
    if (typeof key !== 'string') {
      throw new Error(`Key must be a string ${key}`, )
    }

    if (Array.isArray(value)) {
      for (let item of value) {
        ['title', 'color', 'cmd'].forEach(field => {
          if (typeof item[field] !== 'string') {
            throw new Error(`${field} must be a string ${item[field]}`)
          }
        })
      }
    }
    else {
      throw new Error(`Category value must be array ${key}`)
    }
  }

  return config
}

var config = validateConfig(readConfig())
var configEvents = new EventEmitter()

const wss = new WebSocket.Server({
  port: program.port + 1
});

fs.watchFile(program.config, (curr, prev) => {
  console.log('Config changed')
  try {
    config = readConfig()
    try {
      validateConfig(config)
      configEvents.emit('change', config)
    }
    catch (e) {
      console.error(e)
      configEvents.emit('error', e)
    }
  }
  catch (e) {
    console.error(e)
  }
})

wss.once('listening', () => console.log('Websocket listening on ' + (program.port + 1)))

wss.on('connection', ws => {
  console.log('Client connected')
  const send = (topic, data) => ws.send(JSON.stringify({topic, data}))

  configEvents.on('change', config => send('config', config))
  configEvents.on('error', e => send('error', e.message))

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
