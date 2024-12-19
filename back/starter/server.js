
import app from "./app.js";
import dotenv from'dotenv';

import mongoose from 'mongoose';

dotenv.config({
    path:'./config.env'
})

const DB=process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD)


// -----------------------------Database connection ----------------------------
mongoose.connect(DB , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con=> console.log('DB connection established'))


const port= 3000 ||process.env.PORT;
app.listen(port,()=>{
    console.log(`listening on ${port}`);
    
})