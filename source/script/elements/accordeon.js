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
    let orderInfo = new OrderInfo();
    let coll = document.getElementsByClassName('information');
    for(let i = 0; i < coll.length; i++){
        coll[i].addEventListener('click', function(){
            const id = coll[i].querySelector('[class=description]').dataset.id;
            const checkbox = coll[i].querySelector('[class=checkboxstyle]');
            const priceSelector = coll[i].querySelector('[class=price]');
            const duration = coll[i].querySelector('[class=duration]').dataset.duration;
            const title = coll[i].querySelector('h6').innerText;
            checkbox.checked == true ? checkbox.checked = false : checkbox.checked = true;
            const price = getPrice(priceSelector.innerHTML);
            if (checkbox.checked){
                orderInfo.addService(id, title, price, duration)
            }else{
                orderInfo.deleteService(id)
            }
            if (orderInfo.getNumberOfServices() > 0){
                showFooter(orderInfo.getNumberOfServices(), orderInfo.getFullPrice());
                showEmployee(orderInfo);
            }else{
                hideFooter();
            }
        })
    }
}

function getPrice(rowPrice){
    return +rowPrice.split(' ')[0];
}

class OrderInfo{
    constructor(){
        this.employee = {
            id: 0,
            name: '',
            role: '',
            photo: '',
        }
        this.date = {
            // id: 0,
            date: Date,
        }
        this.servicesInfo = []
    }
    addService(id, title, price, duration){
        let serviceInfo = {
            id: id,
            title: title,
            price: price,
            duration: +duration,
        }
        this.servicesInfo.push(serviceInfo);
    }
    deleteService(id){
        this.servicesInfo.map((element, index) => {
            if(element.id == id){
                this.servicesInfo.splice(index, 1)
            }
            return
        })
    }
    getFullPrice(){
        let fullPrice = 0;
        this.servicesInfo.map((element) => {
            fullPrice += element.price;
        })
        return fullPrice;
    }
    getNumberOfServices(){
        return this.servicesInfo.length;
    }
    getIDs(){
        let ids = [];
        this.servicesInfo.map(element => ids.push(element.id))
        return ids.toString();
    }
    setTime(time){
        const h = time.split(":")[0];
        const m = time.split(":")[1];
        this.date.setHours(h, m);
    }
    getWeek(){
        const day = this.date.getDay();
        switch(day){
            case 0:
                return 'воскресенье'
            case 1:
                return 'понедельник'
            case 2:
                return 'вторник'
            case 3:
                return 'среда'
            case 4:
                return 'четверг'
            case 5:
                return 'пятница'
            case 6:
                return 'суббота'
        }
    }
    getMounth(){
        const mounth = this.date.getMonth();
        switch(mounth){
            case 0:
                return 'января'
            case 1:
                return 'февраля'
            case 2:
                return 'марта'
            case 3:
                return 'апреля'
            case 4:
                return 'мая'
            case 5:
                return 'июня'
            case 6:
                return 'июля'
            case 7:
                return 'августа'
            case 8:
                return 'сентября'
            case 9:
                return 'октября'
            case 10:
                return 'ноября'
            case 11:
                return 'декабря'
        }
    }
    getDay(){
        return this.date.getDate();
    }
    getEndTime(){
        let duration = 0;
        for(let service of this.servicesInfo){
            duration += service.duration;
        }
        let endTime  =  new Date(this.date.toISOString());

        endTime.setMinutes(endTime.getMinutes() + duration);
        return endTime;
    }
    getFullDuration(){
        let duration = 0;
        for(let service of this.servicesInfo){
            duration += service.duration;
        }
        const h = Math.trunc(duration / 60);
        const m = duration - h*60;
        let hours = '';
        let minutes = '';
        if(h > 0){
            hours = `${h} ч `;
        }
        if(m > 0){
            minutes = `${m} мин`;
        }
        return hours + minutes
    }
}