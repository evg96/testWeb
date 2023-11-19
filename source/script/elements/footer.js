

export function showFooter(services, price){
    let footer = document.querySelector('footer');
    const content = `
    <div class="footer-info">
        <div class="footer-price">
            <span>${services} услуги</span>
            <span>${price} руб.</span>
        </div>
        <div class="select-provider" role="button">
            Выбрать мастера
        </div>
    </div>        
    `
    footer.innerHTML = content;
    footer.setAttribute('style', 'position: sticky; bottom: 0;');
}

export function hideFooter(){
    let footer = document.querySelector('footer');
    const content = `
    <a href="../source/html/calendar.html">calendar</a>      
    `
    footer.innerHTML = content;
    footer.style.removeProperty('position');
    footer.style.removeProperty('bottom');
}


{/* <div class="footer-info">
<div class="footer-price">
    <span>3 услуги</span>
    <span>2000 руб.</span>
</div>
<div class="select-provider" role="button">
    Выбрать мастера
</div>
</div> */}