
function init(){
    selectService();
    window.addEventListener("load", init);
}

function selectService(){
    const carService = document.getElementById('car_s')
    car_s.addEventListener("click", () =>{
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


    // const car_s = document.getElementById('car_s')
    // car_s.addEventListener("click", () =>{
    //     console.log("car s");
    // });

    // const washing = document.getElementById('washing')
    // cl.addEventListener("click", () =>{
    //     document.getElementById("cl").style.display = "block";
    //     document.getElementById("mon").style.display = "none";
    // })

    // const tire_s = document.getElementById('remont')
    // shin.addEventListener("click", () =>{
    //     document.getElementById("mon").style.display = "block";
    //     document.getElementById("cl").style.display = "none";
    // })
}