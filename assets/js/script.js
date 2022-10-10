// get current timestamp and reformat for display
function renderCurrentDateTime(){
    let dt = moment().format('MMM DD, YYYY !t hh:mm:ss a').replace('!', 'a');  // moment replaces any 'a' chars with am/pm. fake out
    $('#formattedDateTime').text(dt);
    setInterval(()=> {
        dt = moment().format('MMM DD, YYYY !t hh:mm:ss a').replace('!', 'a');
        $('#formattedDateTime').text(dt);
    }, 1000);
}

// retrieve all form fields, store in object, and return it
function getFormData(){
    return {
        name: $('#projectName').val(),
        type: $('#projectType').val(),
        rate: $('#hourlyRate').val(),
        dueDate: $('#dueDate').val(),
    }
}

// generates HTML <tr><td> elements from objects stored in the Project List array
function renderProjectTable(arrProjectList){
    $('#tblProjectList tbody').empty();   // empty out all HTML    i.e. el.innerHTML = ''

    for(let i=0; i<arrProjectList.length;i++){
        let diffDays = 0; 
        if(arrProjectList[i].dueDate !== moment().format('MM/DD/YYYY')){  // if due date not = current date then calc days difference
            // add 1 to result since moment.js gives erroenous results
            diffDays = moment(arrProjectList[i].dueDate, 'MM/DD/YYYY').diff(moment(), 'days') + 1;  
        }

        let rateCalc = arrProjectList[i].rate * 8 * diffDays;  // calculate potential earnings
        let rateCalcFormatted = '$' + new Intl.NumberFormat({style: 'currency'}).format(rateCalc); // format with $ and commas

        $('#tblProjectList tbody')
            .append($('<tr>').attr('id',`${i}`)
                .append($('<td>').text(arrProjectList[i].name))
                .append($('<td>').text(arrProjectList[i].type))
                .append($('<td>').text('$' + arrProjectList[i].rate))
                .append($('<td>').text(arrProjectList[i].dueDate))
                .append($('<td>').text(diffDays))
                .append($('<td>').text(rateCalcFormatted))  
                .append($('<td>')
                    .append($('<button>')
                        .addClass('btn btn-link')
                        .text('X')
                        .click((event)=>{
                            event.stopPropagation();
                            let trId = $(event.target).parent().parent()[0].id;  // get the parent <tr> id
                            arrProjectList.splice(trId, 1);                      // delete from Project List array
                            localStorage.setItem('projectList', JSON.stringify(arrProjectList));   // save in local storage
                            renderProjectTable(arrProjectList);   
                        })
                    )
                )
            );
    }
}

// hide the modal and reset the form fields to their default values
function hideModal(){
    $('#staticBackdrop').modal('hide');
    $('#projectName').val('');
    $('#projectType').val('');
    $('#hourlyRate').val('');
    $('#dueDate').val('');    
}

// attach event listeners and initialize the Project List array which is retrieved from local storage
function initialize(){
    let arrProjectList = JSON.parse(localStorage.getItem('projectList'));  
    if (arrProjectList===null) arrProjectList = [];

    $('#dueDate').datepicker();   // make the input field a JQuery UI datepicker component
    
    // attach form reset handler to data entry form
    $('#formSubmitProject').on('reset', (event)=>{
        event.preventDefault();
        hideModal();  // reset modal
    });
    
    // attach form submit handler to data entry form
    $('#formSubmitProject').on('submit', (event)=>{
        event.preventDefault();
        arrProjectList.push(getFormData());   // add to project list array
        localStorage.setItem('projectList', JSON.stringify(arrProjectList));  // save to local storage
        hideModal();  // reset modal
        renderProjectTable(arrProjectList);
    });
    
    return arrProjectList;
}

// code that runs the first time and each time user refreshes the page
function start(){
    let arrProjectList = initialize();
    renderCurrentDateTime();
    renderProjectTable(arrProjectList);
}

start();