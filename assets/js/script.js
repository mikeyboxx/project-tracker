function getCurrentDateFormatted(){
    let dt = moment().format('MMM DD, YYYY !t hh:mm:ss a').replace('!', 'a');  // moment replaces any 'a' chars with am/pm. fake out
    return dt;
}

function renderCurrentDateTime(){
    $(formattedDateTime).text(getCurrentDateFormatted());
    let timer = setInterval(()=> $(formattedDateTime).text(getCurrentDateFormatted()), 1000);
}


function getFormData(){
    return {
        name: $('#projectName').val(),
        type: $('#projectType').val(),
        rate: $('#hourlyRate').val(),
        dueDate: $('#dueDate').val(),
    }
}


function renderProjectTable(){
    $('#tblProjectList tbody').innerHTML = '';

    for(let i=0; i<arrProjectList.length;i++){
        $('#tblProjectList tbody')
            .append($('<tr>')
                .append(
                    $('<td>').text(arrProjectList[i].name)
                )
                .append(
                    $('<td>').text(arrProjectList[i].type)
                )
                .append(
                    $('<td>').text(arrProjectList[i].rate)
                )
                .append(
                    $('<td>').text(arrProjectList[i].dueDate)
                )
                .append(
                    $('<td>').text(moment(arrProjectList[i].dueDate).dayOfYear() - moment().dayOfYear())
                )
                .append(
                    $('<td>').text(arrProjectList[i].rate * 8 * (moment(arrProjectList[i].dueDate).dayOfYear() - moment().dayOfYear()))
                )
                .append(
                    $('<td>')
                        .append('<button>')
                        .addClass('btn btn-link')
                        .text('X')
                )
            );
    }

}






var arrProjectList = JSON.parse(localStorage.getItem('projectList'));

if (arrProjectList===null) arrProjectList = [];

renderProjectTable();
renderCurrentDateTime();




$('#formSubmitProject').on('submit', (event)=>{
    event.preventDefault();

    arrProjectList.push(getFormData());
    localStorage.setItem('projectList', JSON.stringify(arrProjectList));

    $('#staticBackdrop').modal('hide');
    $('#projectName').val(''),
    $('#projectType').val('');
    $('#hourlyRate').val(''),
    $('#dueDate').val(''),
    
    console.log(arrProjectList);
    renderProjectTable();
})


// console.log(getCurrentDateFormatted());