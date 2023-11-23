function createDays(datas){
    let content = ''
    for(let data of datas){
        content += `
        <div class="date-button" role="button" data-dayid="${data.id}">
            <span>${data.week}</span>
            <br>
            <span>${data.day}</span>
        </div>         
        `
    }
    return content
}


export function showDays(emplID){
    // element.addEventListener('click', function(){
    let main = document.querySelector('main');
    main.innerHTML = `<div class="date"></div>
                      <div class="time"></div>`
    let date = document.querySelector('[class=date]');
    fetch('./app/date')
    .then((response) => response.json())
    .then((datas) => {
        const content = createDays(datas);
        date.innerHTML = content;
        showTime(emplID);
    });
    // });
}

function showTime(emplID){
    let coll = document.getElementsByClassName('date-button');
    for(let i = 0; i < coll.length; i++){
        const dayID = coll[i].dataset.dayid;
        // console.log("emplID", emplID, " ", "dayID", dayID);
        coll[i].addEventListener('click', function(){
            fetch(`./app/time?dateid=${dayID}&emplid=${emplID}`)
            .then((response) => response.json())
            .then((datas) => {
                let time = document.querySelector('[class=time]');
                const timesContent = createTimes(datas);
                time.innerHTML = timesContent;
            });
        });
    }
}

function createTimes(datas){
    let content = ''
    for(let data of datas){
        content += `
        <div class="time-button" role="button">${data.time}</div>
        `
    }
    return content
}


{/* <div class="time">
<div class="time-button" role="button">12:00</div>
<div class="time-button" role="button">12:30</div>
<div class="time-button" role="button">13:00</div>
<div class="time-button" role="button">13:30</div>
<div class="time-button" role="button">14:00</div>
<div class="time-button" role="button">14:30</div>
<div class="time-button" role="button">15:00</div>
<div class="time-button" role="button">15:30</div>
<div class="time-button" role="button">16:00</div>
<div class="time-button" role="button">16:30</div>
</div>
<div class="time_day"> */}