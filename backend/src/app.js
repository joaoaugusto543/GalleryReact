require('dotenv').config({
    path: process.env.NODE_ENV.trim() === 'test' ?  '.env.testing' : '.env'
})

const path= require('path')

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
        this.server.use('/imgs',express.static(path.join(__dirname,'./imgs')))
    }
}

const app=new App().server

module.exports= app
