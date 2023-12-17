// import { showServices, expandList, listServices  } from './services.js';
import { OrderInfo } from './elements/manage_page.js'
import { showFooter, hideFooter } from './elements/footer.js'
const orderInfo = new OrderInfo;
show();

function show(){
    
    fetch('./app/service')
    .then((response) => response.json())
    .then((datas) => {
        showServices(datas);
        expandList();
        listServices();
    })
}

function showServices(datas) {
    displayCategories(datas);
    displayServices(datas);
}

function expandList(){ 
    let coll = document.getElementsByClassName('collapsible');

    for(let i = 0; i < coll.length; i++){
        coll[i].addEventListener('click', function(){
            this.classList.toggle('active');
            let content = this.nextElementSibling;
            if(content.style.maxHeight){
                content.style.maxHeight = null;
            }else{
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        })
    }
}

function listServices(/*orderInfo/*, histPage*/){
    let coll = document.getElementsByClassName('information');
    
    // var orderInform = require('./script.js');
    for(let i = 0; i < coll.length; i++){
        coll[i].addEventListener('click', function(){
            const id = coll[i].querySelector('[class=description]').dataset.id;
            const checkbox = coll[i].querySelector('[class=checkboxstyle]');
            const priceSelector = coll[i].querySelector('[class=price]');
            const duration = coll[i].querySelector('[class=duration]').dataset.duration;
            const title = coll[i].querySelector('h6').innerText;
            checkbox.checked == true ? checkbox.checked = false : checkbox.checked = true;
            const price = getPrice(priceSelector.innerHTML);
            if (checkbox.checked){
                orderInfo.addService(id, title, price, duration)
                console.log(orderInfo);
            }else{
                orderInfo.deleteService(id)
            }
            if (orderInfo.getNumberOfServices() > 0){
                showFooter(orderInfo.getNumberOfServices(), orderInfo.getFullPrice());
                // histPage.storePage(document.querySelector('main').innerHTML, 'listServices')
                showEmployee(/*orderInfo/*, histPage*/);
                // console.log(orderInfo);
            }else{
                hideFooter();
            }
        })
    }
}

function displayCategories(datas) {
    const element = document.querySelector('#accordion');

    let categiries = new Set();
    let accordions = '';
    for(let data of datas){
        categiries.add(data.category);
    }
    for(let categiry of categiries){
        accordions += accordion(categiry);
    }
    
    element.innerHTML = accordions;
}

function displayServices(datas){
    for(let data of datas){
        const element = document.querySelector(`#services_${data.category}`);
        let service = addServices(data);
        let content = element.innerHTML;
        content += service;
        element.innerHTML = content;
    }
}

function accordion(data){
    return`
    <button class="collapsible">${data}</button>
    <div class="content" id="services_${data}"></div>`
}

function addServices(data){
    const h = Math.floor(+data.duration / 3600);
    const m = ((data.duration/60 - h * 60));
    let hours = '';
    let minutes = '';
    h == 0 ? hours='' : hours=h + ' ч';
    m == 0 ? minutes='' : minutes=m + ' мин';
    const duration = `<span class="duration">${hours} ${minutes}</span>`
    return `
    <div class="information" role="button">
        <input type="checkbox" class="checkboxstyle" disabled />
        <h6>${data.title}</h6>
        <div class="description" data-id="${data.id}">
            <span class="price">${data.price} ₽</span>
            <span class="duration" data-duration="${data.duration}">${duration}</span>
        </div>
    </div>
    `
}

function showEmployee(/*orderInfo/*, histPage*/){
    // console.log("orderInfo", orderInfo);
    const element = document.querySelector('#btn-provider');

    element.addEventListener('click', function(){
        // wordddd = "an word";
        localStorage.setItem('orderInfoServices', JSON.stringify(orderInfo.servicesInfo))
        window.open('./employee.html', '_self');
        // showEmpl(orderInfo/*, histPage*/);
    });
}


function getPrice(rowPrice){
    return +rowPrice.split(' ')[0];
}