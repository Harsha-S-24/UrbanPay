const express = require("express");
const mainRouter=require("./routes/index")
const app =express();
const cors=require('cors');
const PORT=3000;
app.use("/api/v1",mainRouter);
app.use(cors());
app.use(express.json());//body parse to support JSON body in post requests
// const corsOptions={
//     origin:'http://example:5173',//will  allow only this origin
//     methods:['POST'],
//     allowedHeaders:['Content-Type'],
//     credentials:true,
// }
// app.use("/api",cors(corsOptions),(req,res)=>{
//     res.json({
//         message:'this route is CORS-enabled route'
//     })
// })

//in future if we have v2 then we can route those to
//app.use("/api/v2",);


// api/v1/user/signup
// api/v1/user/signin
// api/v1/user/changePassword


// api/v1/account/transferMoney
// api/v1/account/balance

app.listen(PORT);