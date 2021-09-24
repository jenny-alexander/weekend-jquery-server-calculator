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
let calculations = [];

//spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
})

//routes
//GET route
app.get( '/calculations', ( req, res )=>{
    res.send( calculations );
})
//POST route
app.post( '/calculations', ( req, res )=>{

    let firstOperator = Number(req.body.firstNum);
    let secondOperator = Number(req.body.secondNum);

    //do calculation
    switch ( req.body.operation ) {
        case ( '+' ):
            req.body.answer = firstOperator + secondOperator;
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

