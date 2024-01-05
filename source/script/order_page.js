import { OrderInfo } from './elements/manage_page.js'
import { showFooter, hideFooter } from './elements/footer.js'
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
    console.log("service", orderInfo);
    // console.log("employ", lsOrderInfoE);
    // console.log("timeslots", lsOrderInfoT);
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
    document.querySelector('#change-employee').addEventListener('click', function(){
        window.open('./employee.html', '_self');
    });
    document.querySelector('#change-date').addEventListener('click', function(){
        window.open('./calendar.html', '_self');
    });
    document.querySelector('#change-service').addEventListener('click', function(){
        window.open('./services.html', '_self');
    });
    document.getElementById('back').addEventListener('click', function(){
        window.history.back();
    });
    // showFooter(orderInfo.getNumberOfServices(), orderInfo.getFullPrice(), 'Подтвердить запись');
    // document.querySelector('#btn-provider').addEventListener('click', function(){
    //     Telegram.WebApp.sendData("test data");
    //     console.log('data is sent')
    // });
    tg.MainButton.text = "Подтвердить запись";
    tg.MainButton.color = "#91cee6";
    tg.MainButton.isVisible = true;
	tg.MainButton.show();

    Telegram.WebApp.onEvent('mainButtonClicked', function(){
        // const data = tg.initData;
        const data = tg.initDataUnsafe;
        const serviceIDs = orderInfo.servicesInfo.map(function(it){
            return +it.id;
        })
        // alert(data.user.id);
        // alert(data.user.first_name);
        const order = {
            employee_id: orderInfo.employee.id, 
            client_id: data.user.id, 
            time: orderInfo.date,
            services: serviceIDs
        };
        // console.log(order);
        // console.log(orderInfo.servicesInfo[0]);
        console.log(order);


        // fetch('./app/order', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //       },
        //       body: JSON.stringify(order)
        // })
        // // .then((response) => response.json())
        // .then(() => {
        //     // window.open('./info.html', '_self');
        // });


        // console.log('data', data);
        // console.log('data.user', data.user);
        // console.log('data.user.id', data.user.id);
        // console.log('data.user.firstname', data.user.firstname);
        // tg.sendData("data");
        // console.log('main button is clicked', JSON.parse(data))
    });
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
        let editIcon = `
        <div class="check-2" id="change-service">
            <img class="edit-icon" src="../source/img/edit-2-svgrepo-com.svg" alt="">
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