import { OrderInfo } from './elements/manage_page.js'
import { tg } from './telegram.js'

const orderInfo = new OrderInfo;
const lsOrderInfoS = JSON.parse(localStorage.getItem('orderInfoServices'));
const lsOrderInfoE = JSON.parse(localStorage.getItem('orderInfoEmployee'));
const lsOrderInfoT = JSON.parse(localStorage.getItem('orderInfoTimeSlot'));
orderInfo.servicesInfo = lsOrderInfoS;
orderInfo.employee = lsOrderInfoE;
orderInfo.date = new Date(lsOrderInfoT);


genMainPage(orderInfo);

function genMainPage(orderInfo){
    const main = document.querySelector('main');
    const employeeContent = createCheckEmployee(orderInfo.employee);
    const timeContent = createCheckTime(orderInfo);
    const servicesContent =  createCheckServices(orderInfo);
    const content = employeeContent + timeContent + servicesContent;
    main.innerHTML = content;
    tg.BackButton.show();
    Telegram.WebApp.onEvent('backButtonClicked', function(){
        window.history.back();
    });
    document.getElementById('back').addEventListener('click', function(){
        window.history.back();
    })
    // changeOptions(orderInfo);
}


function createCheckEmployee(employee){
    return `
    <div class="check-barber">
        <div class="major-check">
            <div class="check-1">
                <img class="barber-img" src="../source/img/male_empty.png" alt="">
                <div class="info">
                    <p class="title">${employee.name}</p>
                    <p>${employee.role}</p>
                </div>
            </div>
            <div class="check-2" id="change-employee" role="button">
                <img class="edit-icon" src="../source/img/edit-2-svgrepo-com.svg" alt="">
            </div>
        </div>
    </div>
    `
}

function createCheckTime(orderInfo){
    const mounth = orderInfo.getMounth();
    const week = orderInfo.getWeek();
    const day = orderInfo.getDay();
    const dur = orderInfo.getFullDuration();
    const s_h = orderInfo.date.getHours();
    let s_m = orderInfo.date.getMinutes();
    if(s_m == 0){
        s_m = '00';
    }
    const entTime = orderInfo.getEndTime();
    const e_h = entTime.getHours();
    let e_m = entTime.getMinutes();
    if(e_m == 0){
        e_m = '00';
    }
    return `
    <div class="check-date">
        <div class="major-check">
            <div class="check-1">
                <div class="info">
                    <p class="title">${day} ${mounth}, ${week}</p>
                    <p>с ${s_h}:${s_m} до ${e_h}:${e_m} (${dur})</p>
                </div>
            </div>
            <div class="check-2" id="change-date">
                <img class="edit-icon" src="../source/img/edit-2-svgrepo-com.svg" alt="">
            </div>
        </div>
    </div>
    `
}

function createCheckServices(orderInfo){
    let content = '';
    let count = 0;
    for(let service of orderInfo.servicesInfo){
        content += `
        <div class="major-check">
            <div class="check-1">
                <div class="servive-info">
                    <p class="title">${service.title}</p>
                    <p>${service.price} ₽</p>
                </div>
            </div>
            <div class="check-2">
                <img class="edit-icon" src="../source/img/delete-garbage-office-svgrepo-com.svg" alt="">
            </div>
        </div>
        `
        if(count == orderInfo.servicesInfo.length-1){
            continue
        }else{
            content += '<hr>';
        }
        count++;
    }
    return ' <div class="check-services"><div>' + content + '</div></div>'
}