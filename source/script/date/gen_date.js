export class CtsDate{
    constructor(){
        const date = new Date();
        console.log("timezone", date.getHours());
        console.log("UTC", date.getUTCHours());
        console.log("parse", Date.parse(date));
        console.log("timeISO", date.toISOString());
        console.log("time", date.toString());
        this.date = new Date(date.getTime() + (5*60*1000));
        // this.date = new Date();
    }
    getWeek(){
        const day = this.date.getDay();
        switch(day){
            case 0:
                return 'Вс'
            case 1:
                return 'Пн'
            case 2:
                return 'Вт'
            case 3:
                return 'Ср'
            case 4:
                return 'Чт'
            case 5:
                return 'Пт'
            case 6:
                return 'Сб'
        }
    }
    getDay(){
        return this.date.getDate();
    }
    getMonth(){
        return this.date.getMonth();
    }
    incDate(){
        this.date.setDate(this.date.getDate() + 1);
    }
    dateToISO(){
        return this.date.toISOString();
    }
    compareDate(date2){
        if(this.date.getFullYear() === date2.getFullYear()){
            if(this.date.getMonth() === date2.getMonth()){
                if(this.date.getDate() === date2.getDate()){
                    return true;
                }
                return false;
            }
            return false;
        }
    }
}