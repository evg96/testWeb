import { displayServicesGroups, displayServices } from './services.js';
import { expandAccord, listEvent } from './elements/accordeon.js';



let tg = window.Telegram.WebApp;

tg.expand(); //расширяем на все окно  

tg.MainButton.text = "Changed Text"; //изменяем текст кнопки 
tg.MainButton.setText("Changed Text1"); //изменяем текст кнопки иначе
tg.MainButton.textColor = "#F55353"; //изменяем цвет текста кнопки
tg.MainButton.color = "#143F6B"; //изменяем цвет бэкграунда кнопки
tg.MainButton.setParams({"color": "#143F6B"}); //так изменяются все параметры 

const masters = document.getElementById('btn_1')
masters.addEventListener('click', function(){ 
    console.log('btn');
	if (tg.MainButton.isVisible){ //если кнопка показана 
		tg.MainButton.hide() //скрываем кнопку 
	}
  else{ //иначе
  	tg.MainButton.show() //показываем 
  }
});

await fetch('https://telegram-client-services.ru/salon/Tsirulnik-Khimki-1')
.then((response) => response.json())
.then((datas) => {
    displayServicesGroups(datas);
    let ids = '';
    for (let data of datas){
        ids += `${data.id},`
    }
    ids = ids.substring(0, ids.length - 1);  // delete last comma
    fetch(`https://telegram-client-services.ru/salon/Tsirulnik-Khimki-1/service?servgroup=${ids}`)
    .then((respons)=> respons.json())
    .then((services) => {
        displayServices(services);
        expandAccord();
        listEvent();
    })
})




// function selectService(){
//     const masters = document.getElementById('masters')
//     masters.addEventListener("click", () =>{
//         masters.classList.add("active");
//         document.getElementById("services").classList.remove("active")
//         document.getElementById("master-list").style.display = "block";
//         document.getElementById("service-list").style.display = "none";
//     });

//     const services = document.getElementById('services')
//     services.addEventListener("click", () =>{
//         document.getElementById("masters").classList.remove("active");
//         services.classList.add("active")
//         document.getElementById("master-list").style.display = "none";
//         document.getElementById("service-list").style.display = "block";
//     })
// }