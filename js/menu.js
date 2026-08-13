const bouton = document.getElementById("menu-toggle");
const menu = document.getElementById("nav-links");

if (bouton) {

    bouton.addEventListener("click", () => {

        menu.classList.toggle("active");

    });

}