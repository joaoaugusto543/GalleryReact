const express=require('express')

const Router=express()


Router.use('/api/users',require('./usersRouter'))
Router.use('/api/session',require('./sessionRoutes'))
Router.use('/api/albums',require('./albumRoutes'))
Router.use('/api/images',require('./imageRoutes'))

module.exports= Router