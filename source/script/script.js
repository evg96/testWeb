import { displayServicesGroups, displayServices } from './services.js';
import { expandAccord, listEvent } from './elements/accordeon.js';
import { showEmployee } from './elements/employee_card.js';


const slectService = document.querySelector('#btn-service')
const slectProvider = document.querySelector('#btn-provider')

slectService.addEventListener('click', function(){
    let main = document.querySelector('main');
    
    main.innerHTML = `<div class="srv-container">
                        <div id="service-list">
                            <div class="accordion" id="accordion">
                            </div>               
                        </div>
                    </div>`;
    fetch('./app')
    .then((response) => response.json())
    .then((datas) => {
        displayServicesGroups(datas);
        let ids = '';
        for (let data of datas){
            ids += `${data.id},`
        }
        ids = ids.substring(0, ids.length - 1);  // delete last comma
        fetch(`./app/service?servgroup=${ids}`)
        .then((respons)=> respons.json())
        .then((services) => {
            displayServices(services);
            expandAccord();
            listEvent();
        })
    })
});

slectProvider.addEventListener('click', function(){
    let main = document.querySelector('main');
    fetch('./app/employee')
    .then((response) => response.json())
    .then((datas) => {
        const content = showEmployee(datas);
        main.innerHTML = content;
    });
});