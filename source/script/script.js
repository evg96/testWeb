import { displayServicesGroups, displayServices } from './services.js';
import { expandAccord, listEvent } from './elements/accordeon.js';

await fetch('https://telegram-client-services.ru/salon/Tsirulnik-Khimki-1')
.then((response) => response.json())
.then((datas) => {
    displayServicesGroups(datas);
    let ids = '';
    for (let data of datas){
        ids += `${data.id},`
    }
    ids = ids.substring(0, ids.length - 1);  // delete last comma
    fetch(`https://telegram-client-services.ru/salon/Tsirulnik-Khimki-1/service?servgroup=${ids}`)
    .then((respons)=> respons.json())
    .then((services) => {
        displayServices(services);
        expandAccord();
        listEvent();
    })
})

let tg = window.Telegram.WebApp;

// let event = document.getElementById('test_event');

tg.MainButton.text = 'test';
tg.MainButton.enable();


// function selectService(){
//     const masters = document.getElementById('masters')
//     masters.addEventListener("click", () =>{
//         masters.classList.add("active");
//         document.getElementById("services").classList.remove("active")
//         document.getElementById("master-list").style.display = "block";
//         document.getElementById("service-list").style.display = "none";
//     });

//     const services = document.getElementById('services')
//     services.addEventListener("click", () =>{
//         document.getElementById("masters").classList.remove("active");
//         services.classList.add("active")
//         document.getElementById("master-list").style.display = "none";
//         document.getElementById("service-list").style.display = "block";
//     })
// }