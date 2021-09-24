// global attributes
let operation;

$( document ).ready( onReady );

function onReady() {
    getCalculations();
    $( '#submitCalculationButton' ).on( 'click', submitCalculation );
    $( '.operationButton' ).on( 'click', getOperation );
    $( '#clearInput' ).on( 'click', clearInput );
}
function clearInput() {
    $( '#firstNum' ).val('');
    $( '#secondNum' ).val('');
}
function getOperation() {
    operation = $( this ).attr( 'id' );
    //convert to numeric symbol
    switch ( operation ) {
        case 'add':
            operation = '+';
            break;
        case 'subtract':
            operation = '-';
            break;
        case 'multiply':
            operation = '*';
            break;
        case 'divide':
            operation = '/';
            break;
    }
}
function submitCalculation() {
    let objectToSend = {
        firstNum: $( '#firstNum' ).val(),
        secondNum: $( '#secondNum' ).val(),
        operation: operation,
        answer: ''
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

        //target <p> answer element
        elAnswer = $( "#calcAnswer" );
        elAnswer.empty();
        elAnswer = response[response.length-1].answer;

        //target list element 
        let elList = $( '#calculationsOut' );
        elList.empty();

        for ( let i = 0; i < response.length; i++ ) {
            elList.append(
                `<li>${response[i].firstNum} ${response[i].operation} 
                ${response[i].secondNum} = ${response[i].answer}</li>`
            )
        }
    }).catch( function( error ) {
        console.log( 'error:', error );
    })
}