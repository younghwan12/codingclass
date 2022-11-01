const loginBtn = document.querySelector(".loginBtn");
const loginPopup = document.querySelector(".login__popup");
const loginClose = document.querySelector(".login__popup .btn-close");


if(loginBtn){
    loginBtn.addEventListener("click", ()=> {
        loginPopup.classList.add("open");
        document.body.classList.add("fixed");
    });
    loginClose.addEventListener("click", ()=> {
        loginPopup.classList.remove("open");
        document.body.classList.remove("fixed");
    });
}
