const express = require('express');     
const path =  require("path");
const multer  = require('multer');
const app = express();




const PORT = 8000;

//upload is a middleware 
const uploads = multer({ dest: 'uploads/' });         // File ,  Uploads folder  ke ander dal do 

const storage = multer.diskStorage({

    destination: function (req, file, cb){    

        return cb(null , "./uploads");
    } , // kon se folder ke ander particular file ko store karna hai  cb is the callback 

     filename : function(req,file,cb) {

        return cb(null , `${Date.now()}-${file.originalname}`)

     },   // file ka nam kya rakhna hai  Date.now ->>   File ka unique nam ho jayga taki duplicate na ho 


});


const upload = multer({storage});

app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended : false}));     //  form data ko pass karne ka kam karta hai it is a middle ware    


app.get("/", (req, res) => {  

    return res.render("homepage");

});


app.post('/upload', upload.single('profileImage') , (req, res)=>{    
    
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");


});


app.listen(PORT , () =>{
    
    console.log(`Listening server to the ${PORT}`);
})
