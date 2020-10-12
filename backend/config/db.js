const mongoose = require('mongoose')

const connectDb = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.DB_URI,{
            useFindAndModify: true,
            useNewUrlParser: true,
            useCreateIndex:true,
            useUnifiedTopology:true
        })

        console.log(`Db connected ${conn.connection.host}`.cyan.underline)
        
    } catch (error) {
        console.error(`${error.message}`.red.underline.bold)
        process.exit(1)
        
    }
}

module.exports = connectDb