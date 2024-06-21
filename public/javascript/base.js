const hambuger_btn = document.getElementById("hambuger_btn");
const phone_menu = document.getElementById("pho_nav");
let click = false;

function phone_nav(){
    if(!click){
        phone_menu.style = "height:130px;";
        phone_menu.style.overflow = "visible";
        click = true;

    }
    else{
        phone_menu.style = "height:0px;";
        phone_menu.style.overflow = "hidden";
        click = false;

    }

}