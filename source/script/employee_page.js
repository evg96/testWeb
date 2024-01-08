import { OrderInfo } from './elements/manage_page.js'
import { tg } from './telegram.js'

showEmpl();

function showEmpl(){
    const orderInfo = new OrderInfo;
    const lsOrderInfo = JSON.parse(localStorage.getItem('orderInfoServices'));
    orderInfo.servicesInfo = lsOrderInfo;
    let url = '';
    const ids = orderInfo.getIDs();
    if (ids != ""){
        url = `./app/employee?skill=${ids}`
    } else{
        './app/employee'
    }
    let main = document.querySelector('main');
    fetch(url)
    .then((response) => response.json())
    .then((datas) => {
        const emplInfo = getEmplInfo(datas);
        let content = genEmployee(datas, orderInfo);
        main.innerHTML = content;
        tg.BackButton.show();
        Telegram.WebApp.onEvent('backButtonClicked', function(){
            window.history.back();
        });
        // document.getElementById('back').addEventListener('click', function(){
        //     window.history.back();
        // });
        if(datas.length == emplInfo.length){
            date(orderInfo, emplInfo);
        }else{
            alert("something wrong");
            return;
        }
    });    
}

function date(orderInfo, emplInfo){
    let coll = document.getElementsByClassName('card_btn');
    for(let i = 0; i < coll.length; i++){
        coll[i].addEventListener('click', function(){
            orderInfo.employee.id = emplInfo[i].id;
            orderInfo.employee.name = emplInfo[i].name;
            orderInfo.employee.role = emplInfo[i].role;
            localStorage.setItem('orderInfoEmployee', JSON.stringify(orderInfo.employee));
            window.open('./calendar.html', '_self');
            // showDays(orderInfo);
        })
    }
}

function getEmplInfo(datas){
    let info = [];
    for(let data of datas){
        const inf = {
            id: data.id,
            name: data.name,
            role: data.role,
        }
        info.push(inf);
    }
    return info;
}

function genEmployee(datas){
    let content = ''
    for (let data of datas){
        content += createEpmlCard(data);
    }
    return content
}

function createEpmlCard(data){
    return `
    <div class="card_btn" role="button">
    <img src="${data.photo}" alt="">
    <div class="info">
        <span>${data.name}</span><br>
        <span>${data.role}</span>
    </div>
    </div>    
    `
}