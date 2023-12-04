import { hideFooter } from './footer.js';
import { showDays } from './calendar.js';
export function genEmployee(datas, orderInfo){
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

export function showEmployee(orderInfo){
    const element = document.querySelector('#btn-provider');
    let url = '';
    const ids = orderInfo.getIDs();
    if (ids != ""){
        url = `./app/employee?skill=${ids}`
    } else{
        './app/employee'
    }
    element.addEventListener('click', function(){
        let main = document.querySelector('main');
        fetch(url)
        .then((response) => response.json())
        .then((datas) => {
            const emplInfo = getEmplInfo(datas);
            const content = genEmployee(datas, orderInfo);
            main.innerHTML = content;
            hideFooter();
            if(datas.length == emplInfo.length){
                date(orderInfo, emplInfo);
            }else{
                alert("something wrong");
                return;
            }
        });
    });
}

export function changeEmployeeagain(orderInfo){
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
        const content = genEmployee(datas, orderInfo);
        main.innerHTML = content;
        hideFooter();
        if(datas.length == emplInfo.length){
            date(orderInfo, emplInfo);
        }else{
            alert("something wrong");
            return;
        }
    });
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

function date(orderInfo, emplInfo){
    let coll = document.getElementsByClassName('card_btn');
    for(let i = 0; i < coll.length; i++){
        coll[i].addEventListener('click', function(){
            orderInfo.employee.id = emplInfo[i].id;
            orderInfo.employee.name = emplInfo[i].name;
            orderInfo.employee.role = emplInfo[i].role;
            showDays(orderInfo);
        })
    }
}