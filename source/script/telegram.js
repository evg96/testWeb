	




	// const salonName = window.location.pathname;
	// export const appPath = 'app' + salonName


export function initTG(){
	let tg = window.Telegram.WebApp;

	// tg.expand(); //расширяем на все окно  
	
	// // tg.MainButton.text = "Changed Text"; //изменяем текст кнопки 
	// // tg.MainButton.setText(tg.initDataUnsafe.user.id); //изменяем текст кнопки иначе
	// tg.MainButton.textColor = "#0a0a0a"; //изменяем цвет текста кнопки
	// // tg.MainButton.color = "#91cee6"; //изменяем цвет бэкграунда кнопки
	// tg.MainButton.setParams({"color": "#143F6B"}); //так изменяются все параметры
	// // tg.BackButton.isVisible = true;
	// tg.BackButton.show();
	return tg;
}



// let tg = initTG();
// tg.expand();
// tg.BackButton.show();
// Telegram.WebApp.onEvent('backButtonClicked', function(){
// 	const main = document.querySelector('main');
// 	const content = `<div class="main_select">
// 						<div id="btn-service" class="btn" role="button">
// 							Выбрать услугу
// 						</div>
// 						<div id="btn-provider" class="btn" role="button">
// 							Выбрать мастера
// 						</div>
// 					</div>`
// 	console.log('clic back');
// 	main.innerHTML = content;
// });    

// tg.BackButton.isVisible = true;
// tg.BackButton.show();

// const masters = document.getElementById('btn_1')
// masters.addEventListener('click', function(){ 
//     // console.log('btn');
// 	if (tg.MainButton.isVisible){ //если кнопка показана 
// 		tg.MainButton.hide() //скрываем кнопку 
// 	}
//   else{ //иначе
//   	tg.MainButton.show() //показываем 
//   }
// });
