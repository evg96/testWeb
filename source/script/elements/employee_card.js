import { showFooter, hideFooter } from './footer.js'
export function genEmployee(datas){
    let content = ''
    for (let data of datas){
        content += createepmlCard(data);
    }
    return content
}



function createepmlCard(data){
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


export function showEmployee(element){
    element.addEventListener('click', function(){
        let main = document.querySelector('main');
        fetch('./app/employee')
        .then((response) => response.json())
        .then((datas) => {
            const content = genEmployee(datas);
            main.innerHTML = content;
            hideFooter();
        });
    });
}