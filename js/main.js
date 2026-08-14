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
            GALERIE PRODUIT
======================================================*/

const photoPrincipale = document.querySelector("#photo-principale");

const miniatures = document.querySelectorAll(".thumbnail");

miniatures.forEach(miniature=>{

    miniature.addEventListener("click",()=>{

        miniatures.forEach(img=>img.classList.remove("active"));

        miniature.classList.add("active");

        const image = miniature.querySelector("img").src;

        photoPrincipale.src = image;

    });

});

/*====================================================
        SELECTION TAILLE
======================================================*/

let tailleSelectionnee = "";

const tailles = document.querySelectorAll(".size-btn");

tailles.forEach(bouton=>{

    if(bouton.classList.contains("disabled")) return;

    bouton.addEventListener("click",()=>{

        tailles.forEach(t=>t.classList.remove("active"));

        bouton.classList.add("active");

        tailleSelectionnee = bouton.dataset.taille;

    });

});

/*====================================================
        SELECTION COULEUR
======================================================*/

let couleurSelectionnee = "Multicolore";

const couleurs = document.querySelectorAll(".color-circle");

const texteCouleur = document.querySelector("#nom-couleur");

couleurs.forEach(cercle=>{

    cercle.addEventListener("click",()=>{

        couleurs.forEach(c=>c.classList.remove("active"));

        cercle.classList.add("active");

        couleurSelectionnee = cercle.dataset.couleur;

        if(texteCouleur){

            texteCouleur.textContent = couleurSelectionnee;

        }

    });

});

/*====================================================
        QUANTITE
======================================================*/

const moins = document.querySelector("#moins");

const plus = document.querySelector("#plus");

const quantiteInput = document.querySelector("#quantite");

if(moins){

    moins.addEventListener("click",()=>{

        if(quantiteInput.value>1){

            quantiteInput.value--;

        }

    });

}

if(plus){

    plus.addEventListener("click",()=>{

        if(quantiteInput.value<10){

            quantiteInput.value++;

        }

    });

}

/*====================================================
        AJOUT AU PANIER
======================================================*/

const btnAjouter = document.querySelector("#ajouter-panier");

if(btnAjouter){

    btnAjouter.addEventListener("click",()=>{

        if(tailleSelectionnee===""){

            afficherToast(

                "Veuillez sélectionner une taille",

                "error"

            );

            return;

        }

        const produit={

            id:1,

            nom:"Robe wax Adinkra",

            prix:18500,

            taille:tailleSelectionnee,

            couleur:couleurSelectionnee,

            quantite:Number(quantiteInput.value),

            image:"images/produits/produit-01.jpg"

        };

        ajouterAuPanier(produit);

    });

}

/*====================================================
            PAGE PANIER
======================================================*/

const panierContainer = document.querySelector("#panier-container");

const sousTotalElement = document.querySelector("#sous-total");

const livraisonElement = document.querySelector("#livraison");

const reductionElement = document.querySelector("#reduction");

const totalElement = document.querySelector("#total");

/*====================================
        AFFICHER PANIER
====================================*/

function afficherPanier(){

    if(!panierContainer) return;

    const panier = lirePanier();

    if(panier.length===0){

        panierContainer.innerHTML=`

            <div class="panier-vide">

                <i class="fa-solid fa-cart-shopping"></i>

                <h2>Votre panier est vide</h2>

                <a href="boutique.html" class="btn">

                    Continuer mes achats

                </a>

            </div>

        `;

        calculerTotal();

        return;

    }

    panierContainer.innerHTML="";

    panier.forEach(article=>{

        panierContainer.innerHTML+=`

        <div class="cart-item">

            <img src="${article.image}" alt="${article.nom}">

            <div class="cart-info">

                <h3>${article.nom}</h3>

                <p>Taille : ${article.taille}</p>

                <p>Couleur : ${article.couleur}</p>

                <strong>${article.prix.toLocaleString()} FCFA</strong>

            </div>

            <div class="quantity-box">

                <button class="moins"

                    data-id="${article.id}"

                    data-taille="${article.taille}"

                    data-couleur="${article.couleur}">

                    -

                </button>

                <span>${article.quantite}</span>

                <button class="plus"

                    data-id="${article.id}"

                    data-taille="${article.taille}"

                    data-couleur="${article.couleur}">

                    +

                </button>

            </div>

            <button

                class="supprimer"

                data-id="${article.id}"

                data-taille="${article.taille}"

                data-couleur="${article.couleur}">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

    });

    calculerTotal();

}
/*====================================================
            CODES PROMO
======================================================*/

const promoInput = document.querySelector("#code-promo");

const promoButton = document.querySelector("#appliquer-promo");

/*====================================
        APPLIQUER CODE PROMO
====================================*/

function appliquerCodePromo(){

    if(!promoInput) return;

    const code = promoInput.value.trim().toUpperCase();

    const codesValides = [

        "AFRO10",

        "HOMME20",

        "LIVRAISON"

    ];

    if(codesValides.includes(code)){

        localStorage.setItem("promo",code);

        afficherToast(

            "Code promo appliqué avec succès !",

            "success"

        );

    }else{

        localStorage.removeItem("promo");

        afficherToast(

            "Code promo invalide",

            "error"

        );

    }

    calculerTotal();

}

/*====================================
        EVENEMENT BOUTON
====================================*/

if(promoButton){

    promoButton.addEventListener(

        "click",

        appliquerCodePromo

    );

}

/*====================================================
            FORMULAIRE COMMANDE
======================================================*/

const formulaireCommande = document.querySelector("#form-commande");

if(formulaireCommande){

    formulaireCommande.addEventListener("submit",(e)=>{

        e.preventDefault();

        if(validerCommande()){

            confirmerCommande();
        }

    });

}

/*====================================
        VALIDATION
====================================*/

function validerCommande(){

    let valide = true;

    const prenom = document.querySelector("#prenom");
    const nom = document.querySelector("#nom");
    const telephone = document.querySelector("#telephone");
    const adresse = document.querySelector("#adresse");
    const paiement = document.querySelector("input[name='paiement']:checked");

    if(!/^[A-Za-zÀ-ÿ\s]{2,}$/.test(prenom.value)){

        afficherErreur(prenom,"Veuillez saisir un prénom valide");

        valide = false;

    }else{

        supprimerErreur(prenom);

    }

    if(!/^[A-Za-zÀ-ÿ\s]{2,}$/.test(nom.value)){

        afficherErreur(nom,"Veuillez saisir un nom valide");

        valide = false;

    }else{

        supprimerErreur(nom);

    }

    if(!/^[0-9]{8,}$/.test(telephone.value)){

        afficherErreur(

            telephone,

            "Numéro invalide (min. 8 chiffres)"

        );

        valide = false;

    }else{

        supprimerErreur(telephone);

    }

    if(adresse.value.length < 10){

        afficherErreur(

            adresse,

            "Adresse trop courte"

        );

        valide = false;

    }else{

        supprimerErreur(adresse);

    }

    if(!paiement){

        afficherToast(

            "Veuillez choisir un mode de paiement",

            "error"

        );

        valide = false;

    }

    return valide;

}


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

/*====================================================
        AJOUT AU PANIER — SECTION "NOUVEAUTES"
        (cartes produits sur la page d'accueil)
======================================================*/

function initAjoutPanierNouveautes(){

    const section = document.querySelector("#nouveautes");

    if(!section) return;

    const cartes = section.querySelectorAll(".product-card");

    cartes.forEach(carte => {

        const boutonAjouter = carte.querySelector(".btn-cart");

        if(!boutonAjouter) return;

        boutonAjouter.addEventListener("click", () => {

            const nom = carte.dataset.nom || "Produit";

            const prix = Number(carte.dataset.prix) || 0;

            const image = carte.querySelector("img")?.getAttribute("src") || "";

            const produit = {

                id: nom,

                nom: nom,

                prix: prix,

                taille: "Unique",

                couleur: "Standard",

                quantite: 1,

                image: image

            };

            ajouterAuPanier(produit);

        });

    });

}

document.addEventListener("DOMContentLoaded", initAjoutPanierNouveautes);

/*====================================================
        FAVORIS — SECTION "NOUVEAUTES"
        Bascule visuelle du cœur (sans persistance)
======================================================*/

function initFavorisNouveautes(){

    const section = document.querySelector("#nouveautes");

    if(!section) return;

    const boutonsFavoris = section.querySelectorAll(".favorite");

    boutonsFavoris.forEach(bouton => {

        bouton.addEventListener("click", (e) => {

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

document.addEventListener("DOMContentLoaded", initFavorisNouveautes);
