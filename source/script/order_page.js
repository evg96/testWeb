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
        tg.MainButton.hide();
        window.history.back();
    });
    document.querySelector('#change-employee').addEventListener('click', function(){
        window.open('./employee.html', '_self');
    });
    document.querySelector('#change-date').addEventListener('click', function(){
        window.open('./calendar.html', '_self');
    });
    document.querySelector('#change-service').addEventListener('click', function(){
        window.open('./services.html', '_self');
    });
    // document.getElementById('back').addEventListener('click', function(){
    //     window.history.back();
    // });
    tg.MainButton.text = "Подтвердить запись";
    tg.MainButton.color = "#3390ec";   //#91cee6
    tg.MainButton.isVisible = true;
	tg.MainButton.show();

    Telegram.WebApp.onEvent('mainButtonClicked', function(){
        const serviceIDs = orderInfo.servicesInfo.map(function(it){
            return +it.id;
        })
        const order = {
            employee_id: orderInfo.employee.id, 
            time: new Date(orderInfo.date.getTime().valueOf()-orderInfo.date.getTimezoneOffset()*60000),
            services: serviceIDs
        };
        fetch('./app/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Telegram-Data': tg.initData,
              },
              body: JSON.stringify(order)
        })
        .then(response => {
            if(response.ok){
                window.open('./info.html', '_self');
            }else{
                alert('Что-то пошло не так.\nПопробуйте снова.');
                tg.close();
            }
        });
    });
}


function createCheckEmployee(employee){
    return `
    <div class="check-barber">
        <div class="major-check">
            <div class="check-1">
                <img class="barber-img" src="../source/static/images/male_empty.png" alt="">
                <div class="info">
                    <p class="title">${employee.name}</p>
                    <p>${employee.role}</p>
                </div>
            </div>
            <div class="check-2" id="change-employee" role="button">
                <img class="edit-icon" src="../source/static/images/edit-2-svgrepo-com.svg" alt="">
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
                <img class="edit-icon" src="../source/static/images/edit-2-svgrepo-com.svg" alt="">
            </div>
        </div>
    </div>
    `
}

function createCheckServices(orderInfo){
    let content = '';
    let count = 0;
        let editIcon = `
        <div class="check-2" id="change-service">
            <img class="edit-icon" src="../source/static/images/edit-2-svgrepo-com.svg" alt="">
        </div>
        `
    for(let service of orderInfo.servicesInfo){
        content += `
        <div class="major-check">
            <div class="check-1">
                <div class="servive-info">
                    <p class="title">${service.title}</p>
                    <p>${service.price} ₽</p>
                </div>
            </div>
            ${editIcon}
        </div>
        `
        if(count == orderInfo.servicesInfo.length-1){
            continue
        }else{
            content += '<hr>';
        }
        if(count == 0){
            editIcon = '';
        }
        count++;
    }
    return ' <div class="check-services"><div>' + content + '</div></div>'
}