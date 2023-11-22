function createDays(datas){
    let content = ''
    for(let data of datas){
        content += `
        <div class="date-button" role="button">
            <span>${data.week}</span>
            <br>
            <span>${data.day}</span>
        </div>         
        `
    }
    return content
}


export function showDays(){
    // element.addEventListener('click', function(){
    let main = document.querySelector('main');
    main.innerHTML = `<div class="date"></div>`
    let date = document.querySelector('[class=date]');
    fetch('./app/date')
    .then((response) => response.json())
    .then((datas) => {
        const content = createDays(datas);
        date.innerHTML = content;
    });
    // });
}