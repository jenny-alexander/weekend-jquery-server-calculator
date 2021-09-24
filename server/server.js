// requires
const express = require( 'express' );
const app = express();
/// - NEEDED for POST - ///
const bodyparser = require( 'body-parser' );
//uses
// server static files
app.use( express.static( 'server/public' ) ); //base folder for files
/// - NEEDED for POST - ///
app.use( bodyparser.urlencoded( { extended: true } ) );

//globals
const port = 5000;
let answer = 0;
let calculations = [];

//spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
})

//routes
//GET route
app.get( '/calculations', ( req, res )=>{
    console.log( '/calculations GET hit ');
    res.send( calculations );
})
//POST route
app.post( '/calculations', ( req, res )=>{
    console.log( '/calculations POST hit:', req.body );

    let firstOperator = Number(req.body.firstNum);
    let secondOperator = Number(req.body.secondNum);

    //do calculation
    switch ( req.body.operation ) {
        case ( '+' ):
            req.body.answer = firstOperator + secondOperator;
            console.log(req.body.answer);
            break;
        case ( '-' ):
            req.body.answer = firstOperator - secondOperator;
            break;
        case ( '*' ):
            req.body.answer = firstOperator * secondOperator;
            break;
        case ( '/' ):
            req.body.answer = firstOperator / secondOperator;
            break;
    }

    calculations.push( req.body );
    res.sendStatus( 200 );
})

