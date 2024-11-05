import express from 'express'
import cors from 'cors'
const app=express()
import connection from './src/config/db.js';
const PORT = process.env.PORT || 3000;
//--------- Router
import singupRouter from './src/routes/signupRoutes.js';
import otpRouter from './src/routes/otpRouter.js';


// --------Medile were
app.use(cors())
app.use(express.json());


// Define a simple route
app.use('/loanRim',singupRouter)
app.use('/loanRim',otpRouter)





app.listen(PORT,async()=>{
    console.log(`Server is  Running ${PORT}`)
    try {
        const res=await connection
        console.log(`Server is Running Port ${PORT} and MongoDB Connected `)
        
    } catch (error) {
        console.log(`Server is Running Port ${PORT} and MongoDb not Connected ${error}`)
    }
    
})
