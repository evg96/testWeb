import { tg } from './telegram.js'



closeApp()

function closeApp(){
    tg.MainButton.text = "Закрыть";
    tg.MainButton.color = "#3390ec";
    tg.MainButton.isVisible = true;
    tg.MainButton.show();
    tg.BackButton.hide();
    Telegram.WebApp.onEvent('mainButtonClicked', function(){
        tg.close();
    })
}
