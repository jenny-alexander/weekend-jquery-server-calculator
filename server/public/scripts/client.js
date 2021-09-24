console.log('js');

$( document ).ready( onReady );

function onReady() {
    getCalculations();
    $( '#submitCalculationButton' ).on( 'click', submitCalculation );
}

function submitCalculation() {
    let objectToSend = {
        firstNum: $( '#firstNum' ).val(),
        secondNum: $( '#secondNum' ).val(),
        operation: '+'
    }
    console.log('sending object:', objectToSend);
    // make AJAX POST with the object
    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: objectToSend
    }).then( function( response ){
        //if successful, update the DOM
        getCalculations();
    }).catch( function( error ){
        alert('error submitting calculation');
        console.log('submit error:', error );
    })
}

function getCalculations() {
    console.log( 'in getCalculations ' );
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then( function( response ){
        console.log( ' back from server successfully', response );
    }).catch( function( error ) {
        console.log( 'error:', error );
    })
}