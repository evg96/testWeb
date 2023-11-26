function createDays(datas){
    let content = ''
    for(let data of datas){
        content += `
        <div class="date-button" role="button" data-dayid="${data.id}">
            <div>
                <span>${data.week}</span>
                <br>
                <span>${data.day}</span>
            </div> 
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
    content += genByTime(datas, 'morning');
    content += genByTime(datas, 'afternoon');
    content += genByTime(datas, 'night');
    // for(let data of datas){
    //     content += `
    //     <div class="time-button" role="button">${data.time}</div>
    //     `
    // }
    return content
}

function genByTime(datas, timeOfDay){
    let content = ''
    switch (timeOfDay){
        case 'morning':
            for(let data of datas){
                if(+data.time.split(":", 1) < 12){
                    content += `
                    <div class="time-button" role="button">${data.time}</div>
                    `
                    // console.log('morning', data);
                }
            }
            if(content.length > 0){
                const morning = '<div class="time_day"><span>Утро</span></div><div class="time">' 
                + content + '</div>';
                return morning
            }else{
                return '';
            }
        case 'afternoon':
            for(let data of datas){
                if(+data.time.split(":", 1) >= 12 && +data.time.split(":", 1) < 18){
                    content += `
                    <div class="time-button" role="button">${data.time}</div>
                    `
                    // console.log('afternoon', data);
                }
            }
            if(content.length > 0){
                const afternoon = '<div class="time_day"><span>День</span></div><div class="time">' 
                + content + '</div>';
                return afternoon
            }else{
                return '';
            }
        case 'night':
            for(let data of datas){
                if(+data.time.split(":", 1) >= 18){
                    content += `
                    <div class="time-button" role="button">${data.time}</div>
                    `
                    // console.log('night', data);
                }
            }
            if(content.length > 0){
                const night = '<div class="time_day"><span>Вечер</span></div><div class="time">' 
                + content + '</div>';
                return night
            }else{
                return '';
            }
    }
}