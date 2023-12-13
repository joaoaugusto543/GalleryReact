require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})

require('./config/db')

const express=require('express')
const cors=require('cors')
const routes=require('./routes/Router')
const myParser=require('body-parser')

class App{
    constructor(){
        this.server=express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.server.use(cors())
        this.server.use(express.json({
            limit: process.env.MAX_PAYLOAD_SIZE,
	        verify: () => {}
        }))
    }

    routes(){
        this.server.use(routes)
    }
}

const app=new App().server

module.exports= app
