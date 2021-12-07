const express = require( 'express' );
const session = require( 'express-session' );
const flash = require( 'express-flash' );
const path = require( 'path' );
const {UserRouter} = require( './server/routes/userRouter' );
const {CommentRouter} = require( './server/routes/commentRouter' );
const {APIRouter} = require( './server/routes/apiRouter' );

require( './server/config/database' );
require( 'dotenv' ).config();
const app = express();

app.set( 'views', __dirname + '/client/views' );
app.set( 'view engine', 'ejs' );
app.use(express.static(path.join(__dirname, "/users-client/dist/users-client")));

app.use( flash() );
app.use( express.urlencoded({extended:true}) );
app.use( express.json() );
app.use(session({
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 20 }
}));

app.use( '/users', UserRouter );
app.use( '/comments', CommentRouter );
app.use( '/api', APIRouter );

app.all( '*', function( request, response ){
    response.sendFile( path.resolve( './users-client/dist/users-client/index.html' ) );
});

app.listen( process.env.PORT, function(){
    console.log( "The users server is running in port 8181." );
});