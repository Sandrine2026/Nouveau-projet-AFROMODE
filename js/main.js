/*====================================================
        AFROMODE
        MAIN JAVASCRIPT
======================================================*/

/*====================================
        VARIABLES GLOBALES
====================================*/

const body = document.body;

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-menu");

const badgePanier = document.querySelector(".cart-count");

const rechercheBtn = document.querySelector("#search-btn");

const barreRecherche = document.querySelector(".search-box");

const fermerRecherche = document.querySelector(".close-search");

const champRecherche = document.querySelector("#search-input");

const produits = document.querySelectorAll(".product-card");

/*====================================
        MENU HAMBURGER
====================================*/

function fermerMenu(){

    if(!navLinks) return;

    navLinks.classList.remove("active");

    body.classList.remove("menu-open");

    menuToggle?.classList.remove("active");

    menuToggle?.setAttribute("aria-expanded","false");

    const icone = menuToggle?.querySelector("i");

    if(icone){

        icone.classList.remove("fa-xmark");

        icone.classList.add("fa-bars");

    }

}

function ouvrirMenu(){

    if(!navLinks) return;

    navLinks.classList.add("active");

    body.classList.add("menu-open");

    menuToggle?.classList.add("active");

    menuToggle?.setAttribute("aria-expanded","true");

    const icone = menuToggle?.querySelector("i");

    if(icone){

        icone.classList.remove("fa-bars");

        icone.classList.add("fa-xmark");

    }

}

if(menuToggle && navLinks){

    menuToggle.addEventListener("click",()=>{

        const estOuvert = navLinks.classList.contains("active");

        if(estOuvert){

            fermerMenu();

        }else{

            ouvrirMenu();

        }

    });

    /* Ferme le menu automatiquement quand on clique un lien */

    navLinks.querySelectorAll("a").forEach(lien=>{

        lien.addEventListener("click",()=>{

            fermerMenu();

        });

    });

}

/*====================================
FERMETURE MENU SI CLIC EXTERIEUR
====================================*/

document.addEventListener("click",(e)=>{

    if(!navLinks || !menuToggle) return;

    if(!navLinks.contains(e.target)
    && !menuToggle.contains(e.target)){

        fermerMenu();

    }

});

/*====================================
        TOUCHE ESC
====================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        fermerMenu();

    }

});

/*====================================
        BARRE RECHERCHE
====================================*/

if(rechercheBtn){

    rechercheBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        barreRecherche?.classList.toggle("active");

        champRecherche?.focus();

    });

}

if(fermerRecherche){

    fermerRecherche.addEventListener("click",()=>{

        barreRecherche.classList.remove("active");

        champRecherche.value="";

    });

}

/*====================================================
            GESTION DU PANIER
======================================================*/

const CLE_PANIER = "afromode_cart";

/*====================================
        LIRE PANIER
====================================*/

function lirePanier(){

    try{

        const panier = JSON.parse(localStorage.getItem(CLE_PANIER));

        return panier || [];

    }catch(error){

        console.error("Erreur lecture panier :", error);

        return [];

    }

}

/*====================================
        SAUVEGARDER PANIER
====================================*/

function sauvegarderPanier(panier){

    try{

        localStorage.setItem(CLE_PANIER, JSON.stringify(panier));

    }catch(error){

        console.error("Erreur sauvegarde :", error);

    }

}

/*====================================
        BADGE PANIER
====================================*/

function mettreAJourBadge(){

    if(!badgePanier) return;

    const panier = lirePanier();

    let total = 0;

    panier.forEach(article=>{

        total += article.quantite;

    });

    badgePanier.textContent = total;

}

/*====================================
        AJOUT AU PANIER
====================================*/

function ajouterAuPanier(produit){

    const panier = lirePanier();

    const existe = panier.find(item =>

        item.id === produit.id &&
        item.taille === produit.taille &&
        item.couleur === produit.couleur

    );

    if(existe){

        existe.quantite += produit.quantite;

    }else{

        panier.push(produit);

    }

    sauvegarderPanier(panier);

    mettreAJourBadge();

    afficherToast(`${produit.nom} ajouté au panier`);

}

/*====================================
        SUPPRIMER ARTICLE
====================================*/

function supprimerArticle(id, taille, couleur){

    let panier = lirePanier();

    panier = panier.filter(article =>

        !(article.id===id &&
          article.taille===taille &&
          article.couleur===couleur)

    );

    sauvegarderPanier(panier);

    mettreAJourBadge();

}

/*====================================
        MODIFIER QUANTITE
====================================*/

function modifierQuantite(id, taille, couleur, nouvelleQuantite){

    const panier = lirePanier();

    panier.forEach(article=>{

        if(

            article.id===id &&

            article.taille===taille &&

            article.couleur===couleur

        ){

            article.quantite = nouvelleQuantite;

        }

    });

    sauvegarderPanier(panier);

    mettreAJourBadge();

}

/*====================================
        VIDER PANIER
====================================*/

function viderPanier(){

    localStorage.removeItem(CLE_PANIER);

    mettreAJourBadge();

}

/*====================================
INITIALISATION BADGE
====================================*/

document.addEventListener("DOMContentLoaded",()=>{

    mettreAJourBadge();

});
/*====================================================
            TOAST
======================================================*/

function afficherToast(message, type = "success") {

    const ancienToast = document.querySelector(".toast");

    if (ancienToast) {
        ancienToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <i class="fa-solid ${
            type === "success"
                ? "fa-circle-check"
                : "fa-circle-xmark"
        }"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    },3000);

}

/*====================================================
        AJOUT AU PANIER — SITE ENTIER
        (boutons .btn-cart sur n'importe quelle page :
        accueil, boutique, produit...)
======================================================*/

function initBoutonsPanier(){

    document.querySelectorAll(".btn-cart").forEach(bouton => {

        if(bouton.dataset.panierInit === "1") return;

        bouton.dataset.panierInit = "1";

        bouton.addEventListener("click", (e) => {

            e.preventDefault();

            const carte = bouton.closest(".product-card");

            const id = bouton.dataset.id || carte?.dataset.id || carte?.dataset.nom;

            const nom = bouton.dataset.nom || carte?.dataset.nom || "Produit";

            const prix = Number(bouton.dataset.prix || carte?.dataset.prix) || 0;

            const image =
                bouton.dataset.image ||
                carte?.querySelector("img")?.getAttribute("src") ||
                "";

            const taille =
                bouton.dataset.taille ||
                carte?.dataset.taille?.split(" ")[0] ||
                "Unique";

            const couleur =
                bouton.dataset.couleur ||
                carte?.dataset.couleur ||
                "Standard";

            ajouterAuPanier({

                id: String(id),

                nom: nom,

                prix: prix,

                image: image,

                taille: taille,

                couleur: couleur,

                quantite: 1

            });

        });

    });

}

document.addEventListener("DOMContentLoaded", initBoutonsPanier);

/*====================================================
        FAVORIS — SITE ENTIER
        Bascule visuelle du cœur (sans persistance)
======================================================*/

function initFavoris(){

    document.querySelectorAll(".favorite, .favorite-btn").forEach(bouton => {

        if(bouton.dataset.favInit === "1") return;

        bouton.dataset.favInit = "1";

        bouton.addEventListener("click", (e) => {

            e.preventDefault();

            e.stopPropagation();

            bouton.classList.toggle("active");

            const icone = bouton.querySelector("i");

            if(icone){

                icone.classList.toggle("fa-regular");

                icone.classList.toggle("fa-solid");

            }

        });

    });

}

document.addEventListener("DOMContentLoaded", initFavoris);


/*====================================================
        DIAPORAMA TEMOIGNAGES CLIENTS
        (section "Ce que disent nos clients")
======================================================*/

function initTemoignagesSlider(){

    const track = document.querySelector("#testimonial-track");

    if(!track) return;

    const slides = Array.from(track.querySelectorAll(".testimonial-slide"));

    const dotsContainer = document.querySelector("#testimonial-dots");

    const btnPrev = document.querySelector("#testimonial-prev");

    const btnNext = document.querySelector("#testimonial-next");

    const slider = document.querySelector(".testimonial-slider");

    if(slides.length === 0) return;

    let indexActuel = 0;

    let intervalAutoplay = null;

    const DUREE_AUTOPLAY = 5000;

    /*====================================
            CREATION DES POINTS (DOTS)
    ====================================*/

    slides.forEach((slide, index) => {

        const point = document.createElement("button");

        point.type = "button";

        point.className = "testimonial-dot";

        point.setAttribute("role", "tab");

        point.setAttribute("aria-label", `Voir l'avis ${index + 1}`);

        point.addEventListener("click", () => {

            allerAuSlide(index);

            redemarrerAutoplay();

        });

        dotsContainer.appendChild(point);

    });

    const points = Array.from(dotsContainer.querySelectorAll(".testimonial-dot"));

    /*====================================
            AFFICHAGE D'UN SLIDE
    ====================================*/

    function allerAuSlide(index){

        if(index < 0){

            index = slides.length - 1;

        }

        if(index >= slides.length){

            index = 0;

        }

        indexActuel = index;

        track.style.transform = `translateX(-${indexActuel * 100}%)`;

        points.forEach(point => point.classList.remove("active"));

        if(points[indexActuel]){

            points[indexActuel].classList.add("active");

            points[indexActuel].setAttribute("aria-selected", "true");

        }

    }

    /*====================================
            NAVIGATION SUIVANT / PRECEDENT
    ====================================*/

    function slideSuivant(){

        allerAuSlide(indexActuel + 1);

    }

    function slidePrecedent(){

        allerAuSlide(indexActuel - 1);

    }

    if(btnNext){

        btnNext.addEventListener("click", () => {

            slideSuivant();

            redemarrerAutoplay();

        });

    }

    if(btnPrev){

        btnPrev.addEventListener("click", () => {

            slidePrecedent();

            redemarrerAutoplay();

        });

    }

    /*====================================
            DEFILEMENT AUTOMATIQUE
    ====================================*/

    function demarrerAutoplay(){

        intervalAutoplay = setInterval(slideSuivant, DUREE_AUTOPLAY);

    }

    function arreterAutoplay(){

        clearInterval(intervalAutoplay);

    }

    function redemarrerAutoplay(){

        arreterAutoplay();

        demarrerAutoplay();

    }

    if(slider){

        slider.addEventListener("mouseenter", arreterAutoplay);

        slider.addEventListener("mouseleave", demarrerAutoplay);

    }

    /*====================================
            NAVIGATION AU CLAVIER
    ====================================*/

    if(slider){

        slider.setAttribute("tabindex", "0");

        slider.addEventListener("keydown", (e) => {

            if(e.key === "ArrowRight"){

                slideSuivant();

                redemarrerAutoplay();

            }

            if(e.key === "ArrowLeft"){

                slidePrecedent();

                redemarrerAutoplay();

            }

        });

    }

    /*====================================
            SWIPE TACTILE (MOBILE)
    ====================================*/

    let positionDepart = 0;

    let positionFin = 0;

    track.addEventListener("touchstart", (e) => {

        positionDepart = e.touches[0].clientX;

        arreterAutoplay();

    }, { passive:true });

    track.addEventListener("touchend", (e) => {

        positionFin = e.changedTouches[0].clientX;

        const distance = positionDepart - positionFin;

        if(distance > 50){

            slideSuivant();

        }else if(distance < -50){

            slidePrecedent();

        }

        demarrerAutoplay();

    });

    /*====================================
            INITIALISATION
    ====================================*/

    allerAuSlide(0);

    demarrerAutoplay();

}

document.addEventListener("DOMContentLoaded", initTemoignagesSlider);
