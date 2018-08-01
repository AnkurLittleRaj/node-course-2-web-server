const express = require ('express');
const hbs = require ('hbs');
var app = express();
const fs = require ('fs');
const port = process.env.PORT || 3000;
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getfullyr', () =>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase()
})

app.use((req,res,next) =>{
var now = new Date().toString();

var log =`${now}:${req.method},${req.url}`
console.log(log);
fs.appendFileSync('server.log',log +'\n');
next();
});

// app.use((req,res,next) =>{
// // var
// res.render('maintenance.hbs',{
//  pageTitle : "Maintenance Page",
   
//     msg : "Hello you are at the Maintenance page. Please wait for some time"    
// })
// });

app.use(express.static(__dirname+'/public'));
app.get('/',(req,res) =>{
    // res.send('<h1>Hello express</h1>');
    res.render('home.hbs',{
    pageTitle : "Home Page",
   
    msg : "Hello you are at the home page."
}
     
    )
});

app.get('/bad',(req,res) =>{

res.send({
    errorMessage : "unable to fetch data",
})
});
app.get('/about',(req,res) =>{

res.render('about.hbs',{
    pageTitle : "About Page",
    
});
})
app.listen(port,() =>{
    console.log(`server is up on port ${port}`);
});