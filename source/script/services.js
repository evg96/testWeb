export function displayServicesGroups(datas) {
    const element = document.querySelector('#accordion');

    let accordions = '';

    for(let data of datas){
        accordions += accordion(data);
    }
    
    element.innerHTML = accordions;
}

export function displayServices(datas) {
    for(let data of datas){
        const element = document.querySelector(`#services_${data.serv_group}`);
        let services = '';
        for(let serv of data.services){
            services += addServices(serv)
        }
        element.innerHTML = services;
    }
}

function addServices(data){
    let duration = '';
    let hours = '';
    let minutes = '';
    data.duration.hours == 0 ? hours='' : hours=data.duration.hours + ' ч';
    data.duration.minutes == 0 ? minutes='' : minutes=data.duration.minutes + ' мин';
    duration = `<span class="duration">${hours} ${minutes}</span>`
    return `
    <div class="information" role="button">
        <input type="checkbox" class="checkboxstyle" disabled />
        <h6>${data.title}</h6>
        <div class="description" data-id="${data.id}">
            <span class="price">${data.price} руб</span>
            <span class="duration">${duration}</span>
        </div>
    </div>
    `
}

function accordion(data){
    return`
    <button class="collapsible">${data.title}</button>
    <div class="content" id="services_${data.id}">
    </div>
    `
}