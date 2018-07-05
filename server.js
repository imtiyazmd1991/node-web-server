const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var port = process.env.PORT || 3000
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getFullYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('ScrapeMe',(text)=>{
	return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
	var now = new Date().toString();
	var log =  `${now}: ${req.method} ${req.url}`
	console.log();
	fs.appendFile('app-server.log', log + '\n', (err) => {
	  if (err) throw err;
	  console.log('The data to append was appended to file!');
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintainence.hbs');
// });

app.get('/',(req, res)=>{
	res.render('home.hbs',{
		pageTitle:'Homepage',
		name:'Imtiyaz',
		// currentYear: new Date().getFullYear()
	})
});

app.get('/about',(req, res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page',
		// currentYear: new Date().getFullYear()
	});
});

app.get('/projects',(req, res)=>{
	res.render('projects.hbs',{
		pageTitle: 'Projects'
	});
});

app.get('/bad',(req, res) =>{
	res.send({
		errorMessage: 'Unable to handle request'
	});
})

app.listen(port,()=> {
	console.log(`server is up and running ${port}`);
});