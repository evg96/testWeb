import { showServices, expandList, listServices  } from './services.js';
// import { expandAccord, listServices } from './elements/accordeon.js';
import { genEmployee } from './elements/employee_card.js';
import { initTG } from './telegram.js';
import { App, HistoryPage, OrderInfo } from './elements/manage_page.js'


// var orderInform = new OrderInfo;
// export const object = OrderInfo
// localStorage.setItem()
// var orderInform = new OrderInfo;
// export default { orderInform }
// module.exports = { orderInform };
// orderInform.employee.name = "test";

// const selectService = document.querySelector('#btn-service')
// const slectProvider = document.querySelector('#btn-provider')

// selectService.addEventListener('click', async function(){
//     window.open('./services.html', '_self')
//     // let main = document.querySelector('main');
//     // let tg = initTG();
//     // let orderInfo = new OrderInfo();
//     // // let histPage = new HistoryPage();
//     // // let app = new App(orderInfo, histPage);
//     // tg.expand();
//     // tg.BackButton.show();
//     // Telegram.WebApp.onEvent('backButtonClicked', function(){
//     //     tg.BackButton.hide();
//     //     location.reload();
//     // });   
//     // main.innerHTML = `<div class="srv-container">
//     //                     <div id="service-list">
//     //                         <div class="accordion" id="accordion">
//     //                         </div>               
//     //                     </div>
//     //                 </div>`;
//     // await fetch('./app/service')
//     // .then((response) => response.json())
//     // .then((datas) => {
//     //     showServices(datas);
//     //     expandList();
//     //         // listEvent();
//     //         // app.listEvent();
//     //     // })
//     // })
//     // console.log(orderInfo)
//     // listServices(orderInfo);
// });

// slectProvider.addEventListener('click', function(){
//     let main = document.querySelector('main');
//     fetch('./app/employee')
//     .then((response) => response.json())
//     .then((datas) => {
//         const content = genEmployee(datas);
//         main.innerHTML = content;
//     });
// });

