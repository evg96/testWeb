import { hideFooter } from './footer.js';
import { showDays } from './calendar.js';
export function genEmployee(datas){
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


export function showEmployee(element, servicesID){
    let url = '';
    if (servicesID != ""){
        url = `./app/employee?skill=${servicesID}`
    } else{
        './app/employee'
    }
    element.addEventListener('click', function(){
        let main = document.querySelector('main');
        fetch(url)
        .then((response) => response.json())
        .then((datas) => {
            const content = genEmployee(datas);
            main.innerHTML = content;
            hideFooter();
            date();
        });
    });
}

function date(){
    let coll = document.getElementsByClassName('card_btn');
    for(let i = 0; i < coll.length; i++){
        coll[i].addEventListener('click', function(){
            showDays()
        })
    }
}