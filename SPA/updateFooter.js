export default function updateFooter() {
    let active = document.querySelector(".icon-bar .active");
    if(active) active.classList.remove("active");

    let newActive = document.querySelector(`.icon-bar a[href="${window.location.pathname}"]`);
    if(newActive) newActive.classList.add("active");
    else if(window.location.pathname === "/login/index") document.getElementById("perfil").classList.add("active");

    let home = document.getElementById("home");
    if(newActive === document.getElementById("explore")) home.dataset.pageTransition = "right";
    else home.dataset.pageTransition = "left";
}