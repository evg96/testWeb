import { OrderInfo } from './elements/manage_page.js'
import { tg } from './telegram.js'
const orderInfo = new OrderInfo;



show();

function show(){
    tg.expand();
    localStorage.clear();
    // tg.BackButton.hide();
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

function listServices(){
    let coll = document.getElementsByClassName('information');
    for(let i = 0; i < coll.length; i++){
        const checkbox = coll[i].querySelector('[class=real-checkbox]');
        checkbox.addEventListener('change', function() {
            const id = coll[i].querySelector('[class=description]').dataset.id;
            const priceSelector = coll[i].querySelector('[class=price]');
            const duration = coll[i].querySelector('[class=duration]').dataset.duration;
            const title = coll[i].querySelector('h3').innerText;
            if (checkbox.checked){
                console.log("checkbox checked", id);
            }else{
                console.log("checkbox not checked", id);
            }
        })
    }

    // for(let i = 0; i < coll.length; i++){
    //     if (checkbox.checked){
    //         console.log(getPrice(priceSelector.innerHTML))
    //     }
    // }

    //     console.log(coll[i].querySelector('[class=real-checkbox]'));

        // coll[i].addEventListener('click', function(){
            const id = coll[i].querySelector('[class=description]').dataset.id;
            const checkbox = coll[i].querySelector('[class=real-checkbox]');
            const priceSelector = coll[i].querySelector('[class=price]');
            const duration = coll[i].querySelector('[class=duration]').dataset.duration;
            const title = coll[i].querySelector('h3').innerText;
            checkbox.checked == true ? checkbox.checked = false : checkbox.checked = true;
            const price = getPrice(priceSelector.innerHTML);
            if (checkbox.checked){
                orderInfo.addService(id, title, price, duration)
            }else{
                orderInfo.deleteService(id)
            }
            if (orderInfo.getNumberOfServices() > 0){
                tg.MainButton.text = `Выбрано услуг: ${orderInfo.getNumberOfServices()}                  Цена: ${orderInfo.getFullPrice()} ₽`;
                tg.MainButton.color = "#3390ec";
                tg.MainButton.isVisible = true;
                tg.MainButton.show();
                showEmployee();
            }else{
                tg.MainButton.hide();
            }
        // })
    // }
}

// function listServices(){
//     let coll = document.getElementsByClassName('information');
//     for(let i = 0; i < coll.length; i++){
//         coll[i].addEventListener('click', function(){
//             const id = coll[i].querySelector('[class=description]').dataset.id;
//             const checkbox = coll[i].querySelector('[class=real-checkbox]');
//             const priceSelector = coll[i].querySelector('[class=price]');
//             const duration = coll[i].querySelector('[class=duration]').dataset.duration;
//             const title = coll[i].querySelector('h3').innerText;
//             checkbox.checked == true ? checkbox.checked = false : checkbox.checked = true;
//             const price = getPrice(priceSelector.innerHTML);
//             if (checkbox.checked){
//                 orderInfo.addService(id, title, price, duration)
//             }else{
//                 orderInfo.deleteService(id)
//             }
//             if (orderInfo.getNumberOfServices() > 0){
//                 tg.MainButton.text = `Выбрано услуг: ${orderInfo.getNumberOfServices()}                  Цена: ${orderInfo.getFullPrice()} ₽`;
//                 tg.MainButton.color = "#3390ec";
//                 tg.MainButton.isVisible = true;
//                 tg.MainButton.show();
//                 showEmployee();
//             }else{
//                 tg.MainButton.hide();
//             }
//         })
//     }
// }

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
    Telegram.WebApp.onEvent('backButtonClicked', function(){
        window.history.back();
    });
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
        <label>
            <input type="checkbox" class="real-checkbox"/>
            <span class="custom-checkbox"></span>
            <h3>${data.title}</h3>
            <div class="description" data-id="${data.id}">
                <span class="price">${data.price} ₽</span>
                <span class="duration" data-duration="${data.duration}">${duration}</span>
            </div>
        </label>
    </div>
    `
}

function showEmployee(){
    Telegram.WebApp.onEvent('mainButtonClicked', function(){
        localStorage.setItem('orderInfoServices', JSON.stringify(orderInfo.servicesInfo))
        const data = tg.initDataUnsafe;
        console.log('main button is clicked', data.user);
        window.open('./employee.html', '_self');
    });
}


function getPrice(rowPrice){
    return +rowPrice.split(' ')[0];
}