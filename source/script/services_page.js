import { showServices, expandList, listServices  } from './services.js';


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