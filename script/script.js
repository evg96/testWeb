
function init(){
    selectService();
    window.addEventListener("load", init);
}

function selectService(){
    const cl = document.getElementById('cleaning')
    cl.addEventListener("click", () =>{
        document.getElementById("cl").style.display = "block";
        document.getElementById("mon").style.display = "none";
    })

    const shin = document.getElementById('remont')
    shin.addEventListener("click", () =>{
        document.getElementById("mon").style.display = "block";
        document.getElementById("cl").style.display = "none";
    })
}