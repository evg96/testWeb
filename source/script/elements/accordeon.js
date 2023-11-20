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
    let ids = [];
    for(let i = 0; i < coll.length; i++){
        coll[i].addEventListener('click', function(){
            const id = coll[i].querySelector('[class=description]').dataset.id;
            const checkbox = coll[i].querySelector('[class=checkboxstyle]');
            const priceSelector = coll[i].querySelector('[class=price]');
            checkbox.checked == true ? checkbox.checked = false : checkbox.checked = true;
            let changePrice = getPrice(priceSelector.innerHTML);
            if (checkbox.checked){
                price += changePrice;
                services++
                ids.push(id);
                // console.log(ids.toString());
            }else{
                price -= changePrice;
                services--
                const index = ids.indexOf(id);
                ids.splice(index, 1);
                // console.log(ids.toString());
            }
            // const a = [1, 10, 3, 2, 11]
            // console.log(a.toString()) //1,10,3,2,11
            if (price > 0){
                showFooter(services, price);
                const element = document.querySelector('#btn-provider');
                showEmployee(element, ids.toString());
            }else{
                hideFooter();
            }
        })
    }
}

function getPrice(rowPrice){
    return +rowPrice.split(' ')[0];
}