const express=require('express')

const Router=express()


Router.use('/api/hello',require('./hello'))

module.exports= Router