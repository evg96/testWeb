import { CtsDate } from './date/gen_date.js';
import { OrderInfo } from './elements/manage_page.js'
import { tg } from './telegram.js'


const orderInfo = new OrderInfo;
const lsOrderInfoS = JSON.parse(localStorage.getItem('orderInfoServices'));
const lsOrderInfoE = JSON.parse(localStorage.getItem('orderInfoEmployee'));
orderInfo.servicesInfo = lsOrderInfoS;
orderInfo.employee = lsOrderInfoE;

showDays(orderInfo);

function showDays(orderInfo){
    let main = document.querySelector('main');
    main.innerHTML = `<div class="date"></div>
                      <div class="time"> Выберете дату</div>`
    fetch(`./app/date?emplid=${orderInfo.employee.id}`)
    .then((response) => response.json())
    .then((datas) => {
        createDays(datas, orderInfo);
    });
}


function createDays(availDates, orderInfo){ 
    // fetch('./app/today')
    // .then((response) => response.json())
    // .then((data) => {
        let today = new CtsDate();
        let content = createDayButton(today, availDates);
        let main = document.querySelector('main');
        main.innerHTML = `<div class="date"></div>
                          <div class="time"> Выберете дату</div>`
        let date = document.querySelector('[class=date]');
        date.innerHTML = content;
        tg.BackButton.show();
        Telegram.WebApp.onEvent('backButtonClicked', function(){
            window.history.back();
        });
        document.getElementById('back').addEventListener('click', function(){
            window.history.back();
        })
        showTime(orderInfo);
    // })
}

function createDayButton(today, availDates){
    let content = '';
    let count = 0;
    for(let i = 0; i < 40; i++){
        let btnClass = 'date-button unavail';
        if(count < availDates.length){
            const avail = new Date(availDates[count].date);
            if(today.compareDate(avail)){
                btnClass = 'date-button avail';
                count++;
            }
        }

        const week = today.getWeek();
        const day = today.getDay();
        const dataDate = today.dateToISO().split('T')[0];
        content += `
        <div class="${btnClass}" role="button" data-date="${dataDate}">
            <div>
                <span>${week}</span>
                <br>
                <span>${day}</span>
            </div> 
        </div>         
        `
        today.incDate();
    }
    return content; 
}

function showTime(orderInfo){
    const coll = document.getElementsByClassName('date-button');
    for(let i = 0; i < coll.length; i++){
        const date = coll[i].dataset.date;
        coll[i].addEventListener('click', function(){
            // orderInfo.today = new Date(date);
            orderInfo.date = new Date(date);
            let totalDur = 0;
            // const reqDate = orderInfo.today.toISOString().split('T')[0];
            const reqDate = orderInfo.date.toISOString().split('T')[0];
            for(let service of orderInfo.servicesInfo){
                totalDur += service.duration;
            }
            fetch(`./app/time?date=${reqDate}&emplid=${orderInfo.employee.id}&duration=${totalDur}`)
            .then((response) => response.json())
            .then((datas) => {
                console.log(datas.times)
                let time = document.querySelector('[class=time]');
                // const timesContent = createTimes(datas.times, orderInfo.today);
                if(datas.times === null){
                    time.innerHTML = 'Запись на эту дату недоступна';
                }else{
                    const timesContent = createTimes(datas.times, orderInfo.date);
                    time.innerHTML = timesContent;
                }
                orderPage(orderInfo);
                })
            // });
        });
    }
}

function createTimes(times, today){
    let content = '';
    let pageTime = '';
    today.setHours(10, 0);
    let i = 0;
    
    for(; i < 4; i++){
        content += createTimeButton(today, times);
        today.setMinutes(today.getMinutes() + 30);
    }
    pageTime += '<div class="time_day"><span>Утро</span></div><div class="time">' + content + '</div>';
    
    content = '';
    for(; i < 16; i++){
        content += createTimeButton(today, times);
        today.setMinutes(today.getMinutes() + 30);
    }
    pageTime += '<div class="time_day"><span>День</span></div><div class="time">' + content + '</div>';
   
    content = '';
    for(; i < 23; i++){
        content += createTimeButton(today, times);
        today.setMinutes(today.getMinutes() + 30);
    }
    pageTime += '<div class="time_day"><span>Вечер</span></div><div class="time">' + content + '</div>';
    return pageTime;
}

function createTimeButton(today, times){
    let minutes = '';
    if(today.getMinutes() == 0){
        minutes = '00';
    }else{
        minutes = today.getMinutes();
    }
    const time = today.getHours() + ":" + minutes;
    let classTime = "time-button unavail";
    if(time == times[0]){
        classTime = "time-button";
        times.shift();
    }
    return `
    <div class="${classTime}" role="button" data-time=${time}>${time}</div>
    `
}

function orderPage(orderInfo){
    const coll = document.getElementsByClassName('time-button');
    for(let i = 0; i < coll.length; i++){
        const time = coll[i].dataset.time;
        coll[i].addEventListener('click', function(){
            orderInfo.setTime(time);
            localStorage.setItem('orderInfoTimeSlot', orderInfo.date.valueOf())
            // localStorage.setItem('orderInfoTimeSlot', orderInfo.date.valueOf()+orderInfo.date.getTimezoneOffset())
            window.open('./order.html', '_self');
            // genMainPage(orderInfo);
        });
    }
}