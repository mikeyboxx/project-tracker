function getCurrentDateFormatted(){
    return moment().format('MMM DD, YYYY !t hh:mm:ss a').replace('!', 'a');  // moment replaces any 'a' chars with am/pm. fake out
}

function renderCurrentDateTime(){
    $('#formattedDateTime').text(getCurrentDateFormatted());
    let timer = setInterval(()=> $('#formattedDateTime').text(getCurrentDateFormatted()), 1000);
}

function getFormData(){
    return {
        name: $('#projectName').val(),
        type: $('#projectType').val(),
        rate: $('#hourlyRate').val(),
        dueDate: $('#dueDate').val(),
    }
}

function renderProjectTable(arrProjectList){
    $('#tblProjectList tbody').empty();

    for(let i=0; i<arrProjectList.length;i++){
        let projDayOfYear = moment(arrProjectList[i].dueDate).dayOfYear();
        let currDayOfYear = moment().dayOfYear();

        projDayOfYear = (projDayOfYear < currDayOfYear) ? projDayOfYear+=365 : projDayOfYear;
        let diffDays = projDayOfYear - currDayOfYear;

        $('#tblProjectList tbody')
            .append($('<tr>').attr('id',`${i}`)
                .append($('<td>').text(arrProjectList[i].name))
                .append($('<td>').text(arrProjectList[i].type))
                .append($('<td>').text(arrProjectList[i].rate))
                .append($('<td>').text(arrProjectList[i].dueDate))
                .append($('<td>').text(diffDays))
                .append($('<td>').text(arrProjectList[i].rate * 8 * diffDays))
                .append($('<td>')
                    .append($('<button>')
                        .addClass('btn btn-link')
                        .text('X')
                        .click((event)=>{
                            event.stopPropagation();
                            let trId = $(event.target).parent().parent()[0].id;
                            arrProjectList.splice(trId, 1);
                            localStorage.setItem('projectList', JSON.stringify(arrProjectList));
                            renderProjectTable(arrProjectList);
                        })
                    )
                )
            );
    }
}

function initialize(arrProjectList){
    arrProjectList = JSON.parse(localStorage.getItem('projectList'));
    if (arrProjectList===null) arrProjectList = [];
    
    $('#formSubmitProject').on('submit', (event)=>{
        event.preventDefault();
        
        arrProjectList.push(getFormData());
        localStorage.setItem('projectList', JSON.stringify(arrProjectList));
        
        $('#staticBackdrop').modal('hide');
        $('#projectName').val(''),
        $('#projectType').val('');
        $('#hourlyRate').val(''),
        $('#dueDate').val(''),
        
        renderProjectTable(arrProjectList);
    });
}

function start(){
    var arrProjectList = [];

    initialize(arrProjectList);
    renderCurrentDateTime();
    renderProjectTable(arrProjectList);
}

start();







// console.log(getCurrentDateFormatted());