const express  = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('../backend/config/db')
const productRoutes = require('./routes/productRoutes')
const notFound = require('./middleware/errorMiddleware')
const errorHandler = require('./middleware/errorMiddleware')




dotenv.config()

connectDB()

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
