const mongoose = require('mongoose')

const connectDb = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.DB_URI,{
            useFindAndModify: true,
            useNewUrlParser: true,
            useCreateIndex:true,
            useUnifiedTopology:true
        })

        console.log(`Db connected ${conn.connection.host}`)
        
    } catch (error) {
        console.error(`${error.message}`)
        process.exit(1)
        
    }
}

module.exports = connectDb