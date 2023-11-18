	




	const salonName = window.location.pathname;
	export const appPath = 'app' + salonName


export function initTG(){
	let tg = window.Telegram.WebApp;

	tg.expand(); //расширяем на все окно  
	
	// tg.MainButton.text = "Changed Text"; //изменяем текст кнопки 
	// tg.MainButton.setText(tg.initDataUnsafe.user.id); //изменяем текст кнопки иначе
	tg.MainButton.textColor = "#0a0a0a"; //изменяем цвет текста кнопки
	// tg.MainButton.color = "#91cee6"; //изменяем цвет бэкграунда кнопки
	tg.MainButton.setParams({"color": "#143F6B"}); //так изменяются все параметры
	return tg;
}



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
