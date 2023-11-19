// import { initTG } from '../telegram.js';
import { showEmployee } from './employee_card.js';
import { showFooter, hideFooter } from './footer.js'
export function expandAccord(){ 
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

export function listEvent(){
    let coll = document.getElementsByClassName('information');
    let price = 0;
    let services = 0;
    for(let i = 0; i < coll.length; i++){
        coll[i].addEventListener('click', function(){
            let checkbox = coll[i].querySelector('[class=checkboxstyle]');
            let priceSelector = coll[i].querySelector('[class=price]');
            checkbox.checked == true ? checkbox.checked = false : checkbox.checked = true;
            let changePrice = getPrice(priceSelector.innerHTML);
            if (checkbox.checked){
                price += changePrice;
                services++
            }else{
                price -= changePrice;
                services--
            }
            
            if (price > 0){
                showFooter(services, price);
                const element = document.querySelector('#btn-provider');
                showEmployee(element);
            }else{
                hideFooter();
            }
        })
    }
}

function getPrice(rowPrice){
    return +rowPrice.split(' ')[0];
}