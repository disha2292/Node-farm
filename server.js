const fs = require('fs');
const http = require('http'); 
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate')
const slugify = require('slugify'); 
///////////////////////////////////////////////. 
//server
//synchronus because it is only get executed once so sync is easier , out of callback


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');


const data = fs.readFileSync(`${__dirname}/Node_farm/data.json`,'utf-8');
const dataObj = JSON.parse(data);


const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);


const server = http.createServer((req,res) => {   
const { query ,pathname } = url.parse(req.url,true);

//overview page
if(pathname === '/' || pathname === '/overview'){
res.writeHead(200, {'Content-type': 'text/html'});

const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
res.end(output);

//product page
} else if (pathname === '/product'){
res.writeHead(200, {'Content-type': 'text/html'});
const product = dataObj[query.id]; 
const output = replaceTemplate( tempProduct , product);
res.end(output);

//api page
} else if (pathname === '/api') {
res.writeHead(200, {'Content-type': 'application/json'});
res.end(data);


//not found
} else {
res.writeHead(404,{
'Content-type':'text/html',
'my-own-header':'hello-world'
});
res.end('<h1>page not found !</h1>');
}
    //  console.log(req.url); 
    //  res.end('helloooooo');  
});


//server listening
server.listen(7550,'127.0.0.1' , () =>{
    console.log("listening");
});

// fs.readFile('start.txt','utf-8' ,(err,data1) => {
//     fs.readFile(`${data1}.txt`,'utf-8' ,(err,data2) => {
//         console.log(data2);
//         fs.readFile('append.txt ','utf-8' ,(err,data3) => {
//             console.log(data3);
//             fs.writeFile( 'final.txt',`${data2}\n${data3}`,'utf-8', err => {
//              console.log("your file has been written ");

//             })
//         }); 
        
//     });
   
// });
// console.log(" will read file "); 
