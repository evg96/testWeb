import { initTG } from '../telegram.js'
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
    let tg = initTG();
    for(let i = 0; i < coll.length; i++){
        coll[i].addEventListener('click', function(){
            let checkbox = coll[i].querySelector('[class=checkboxstyle]');
            let priceSelector = coll[i].querySelector('[class=price]');
            checkbox.checked == true ? checkbox.checked = false : checkbox.checked = true;
            let changePrice = getPrice(priceSelector.innerHTML);
            checkbox.checked == true ? price += changePrice : price -= changePrice;
            if (price > 0){
                const text = "total price " + price;
                tg.MainButton.setText(text);
                tg.MainButton.show();
            }else{
                tg.MainButton.hide()
            }
            console.log("total price", price);
            
        })
    }
}

function getPrice(rowPrice){
    return +rowPrice.split(' ')[0];
}