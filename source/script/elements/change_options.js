import { changeEmployeeagain } from './employee_card.js';
import { showDays } from './calendar.js';


export function changeOptions(orderInfo){
    changeEmployee(orderInfo);
    changeDate(orderInfo);
}


function changeEmployee(orderInfo){
    const changeEmployeeButton = document.getElementById('change-employee');
    changeEmployeeButton.addEventListener('click', function(){
        changeEmployeeagain(orderInfo);
    })
}

function changeDate(orderInfo){
    const changeDateButton = document.getElementById('change-date');
    changeDateButton.addEventListener('click', function(){
        console.log()
        showDays(orderInfo);
    })
}