const express  = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');
const async = require('async');
const expressHbs = require('express-handlebars');

const app = express();

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname:'.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));


app.get('/', (req, res, next) => {
	res.render('main/home.hbs');
})

app.listen(3030, (err) => {
	if(err){
		console.log(err);
	} else {
		console.log("Runnig at Port 3030");
	}
})