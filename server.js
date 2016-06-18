var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const express = require('express');
const app = express();
const aws = require('aws-sdk');


//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 60000 }}));
app.use(cookieParser());

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

var routes = require('./controllers/projectX_controller.js');
var users_controller = require('./controllers/users_controller.js');

app.use('/', routes);
app.use('/users', users_controller);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('listening on PORT',port);
});

app.set('views', './views');
app.use(express.static('./public'));



// Start of S3 upload feature
app.engine('html', require('ejs').renderFile);

//const S3_BUCKET = process.env.S3_BUCKET;
const S3_BUCKET = "zombiesrising";

console.log(S3_BUCKET);

app.get('/account', (req, res) => res.render('account.html'));

app.get('/sign-s3', (req, res) => {
	console.log(req.query);
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: "zombiesrising",
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: 'https://${S3_BUCKET}.s3.amazonaws.com/${fileName}'
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.post('/save-details', (req, res) => {
  // TODO: Read POSTed form data and do something useful
});
