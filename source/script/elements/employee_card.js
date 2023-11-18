export function showEmployee(datas){
    let content = ''
    console.log(datas);
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