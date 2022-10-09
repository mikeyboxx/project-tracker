function getCurrentDateFormatted(){
    let dt = moment().format('MMM DD, YYYY !t h:mm:ss a').replace('!', 'a');  // moment replaces any 'a' chars with am/pm. fake out
    return dt;
}

function renderCurrentDateTime(){
    $(formattedDateTime).text(getCurrentDateFormatted());
    let timer = setInterval(()=> $(formattedDateTime).text(getCurrentDateFormatted()), 1000);
}

renderCurrentDateTime();


// console.log(getCurrentDateFormatted());