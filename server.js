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

//2d6de24f91654473d25cee696654cdd7-us18
//https://us18.api.mailchimp.com/3.0/lists/9d488c4316/members
///lists/{list_id}/members
///lists/9d488c4316/members
/*
app.get('/', (req, res, next) => {
	res.render('main/home.hbs');
})
*/

app.route('/')
	.get((req, res, next) => {
		res.render('main/home');
	})
	.post((req, res, next) => {
		request({
			url: 'https://us18.api.mailchimp.com/3.0/lists/9d488c4316/members',
			method: 'POST',
			headers: {
				'Authorization': 'randomUser 2d6de24f91654473d25cee696654cdd7-us18',
				'Content-Type': 'application/json'
			},
			json: {
				'email_address': req.body.email,
				'status': 'subscribed'
			}
		}, function (err, response, body) {
			if(err) {
				console.log(err);
			} else {
				console.log('Sucessfully sent');
				res.redirect('/');
			}
		})
	})



app.listen(3030, (err) => {
	if(err){
		console.log(err);
	} else {
		console.log("Runnig at Port 3030");
	}
})