
// import { MakeOrder } from "./make_order";


function init(){
    selectService();
    // openOrderPage();
    window.addEventListener("load", init);
}

function selectService(){
    const carService = document.getElementById('car_s')
    carService.addEventListener("click", () =>{
        document.getElementById("car_s").classList.add("active");
        document.getElementById("washing").classList.remove("active")
        document.getElementById("tire_s").classList.remove("active")
        document.getElementById("car_washing").style.display = "none";
        // document.getElementById("tire_service").style.display = "none";
        document.getElementById("car_service").style.display = "block";
    });

    const washing = document.getElementById('washing')
    washing.addEventListener("click", () =>{
        document.getElementById("washing").classList.add("active");
        document.getElementById("car_s").classList.remove("active")
        document.getElementById("tire_s").classList.remove("active")
        document.getElementById("car_washing").style.display = "block";
        // document.getElementById("tire_service").style.display = "none";
        document.getElementById("car_service").style.display = "none";
    })

    const tireService = document.getElementById('tire_s')
    tireService.addEventListener("click", () =>{
        document.getElementById("tire_s").classList.add("active");
        document.getElementById("washing").classList.remove("active")
        document.getElementById("car_s").classList.remove("active")
        document.getElementById("car_washing").style.display = "none";
        // document.getElementById("tire_service").style.display = "block";
        document.getElementById("car_service").style.display = "none";
    })
}

// function openOrderPage(){
//     const mOrder = document.getElementById('m_order')
//     mOrder.addEventListener("click", () =>{
//         mOrder.dats
//         const modalWindow = MakeOrder();
//         document.body.innerHTML(modalWindow);
//         console.log(modalWindow);
//     });
// }

// function openOrderPage(){
//     document.addEventListener('DOMContentLoaded', function() {
        
//         // получим кнопку id="btn" с помощью которой будем открывать модальное окно
//         const btn = document.querySelector('#btn');
//         // активируем контент id="modal" как модальное окно
//         const modal = new bootstrap.Modal(document.querySelector('#modal'));
//         // при нажатии на кнопку
//         btn.addEventListener('click', function() {
//           // открываем модальное окно
//           console.log("tup tup tup tup");
//         //   modal.show();
//         });
      
//       });
// }

function MakeOrder () {
    return `
        <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Заголовок модального окна</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body">
                <p>Здесь идет основной текст модального окна</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary">Сохранить изменения</button>
            </div>
            </div>
        </div>
        </div>
    `
}