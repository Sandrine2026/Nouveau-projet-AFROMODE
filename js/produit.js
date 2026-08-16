/*=========================================================
        AFROMODE — PAGE PRODUIT
        Chargement dynamique d'une fiche produit
        à partir du paramètre d'URL ?id=
=========================================================*/

const CATALOGUE_PRODUITS = [

    {
        id: 1, nom: "Robe wax Adinkra", categorie: "femmes", categorieLabel: "Femmes",
        reference: "AFR-ROB-001", prix: 18500, ancienPrix: null, badge: "new", badgeLabel: "Nouveau",
        note: 4.8, avis: 24,
        description: "Robe wax aux motifs Adinkra, coupe fluide midi. Tissu 100% coton ghanéen. Doublure intérieure. Fermeture invisible dos.",
        couleurs: [
            { nom: "Multicolore", hex: "#E94560" },
            { nom: "Bleu/Jaune", hex: "#1E40AF" },
            { nom: "Rouge/Vert", hex: "#15803D" }
        ],
        tailles: ["S", "M", "L", "XL"],
        images: [
            "images/produits/robe-adinkra-1.jpg",
            "images/produits/robe-adinkra-2.jpg",
            "images/produits/robe-adinkra-3.jpg",
            "images/produits/robe-adinkra-4.jpg"
        ]
    },
    {
        id: 2, nom: "Chemise Kente homme", categorie: "hommes", categorieLabel: "Hommes",
        reference: "AFR-CHE-002", prix: 10500, ancienPrix: 14000, badge: "promo", badgeLabel: "Promo",
        note: 4.6, avis: 17,
        description: "Chemise à motifs Kente, coupe droite décontractée. Tissu wax 100% coton, boutonnage complet, idéale pour un look chic et coloré.",
        couleurs: [{ nom: "Multicolore", hex: "#D4881A" }],
        tailles: ["S", "M", "L", "XL", "2XL"],
        images: ["images/produits/produit-02.jpg"]
    },
    {
        id: 3, nom: "Sac raphia brodé", categorie: "accessoires", categorieLabel: "Accessoires",
        reference: "AFR-SAC-003", prix: 9800, ancienPrix: null, badge: "trend", badgeLabel: "Tendance",
        note: 4.9, avis: 12,
        description: "Sac en raphia tressé à la main, broderies artisanales. Doublure intérieure avec poche zippée, anses renforcées.",
        couleurs: [{ nom: "Multicolore", hex: "#D4881A" }],
        tailles: [],
        images: ["images/produits/produit-03.jpg"]
    },
    {
        id: 4, nom: "Boubou dashiki modern", categorie: "femmes", categorieLabel: "Femmes",
        reference: "AFR-BOU-004", prix: 17600, ancienPrix: 22000, badge: "new", badgeLabel: "Nouveau",
        note: 4.7, avis: 31,
        description: "Boubou dashiki revisité, coupe moderne et ample, motifs graphiques colorés. Confortable pour toutes les occasions.",
        couleurs: [{ nom: "Multicolore", hex: "#E94560" }],
        tailles: ["M", "L", "XL", "2XL", "3XL"],
        images: ["images/produits/produit-04.jpg"]
    },
    {
        id: 5, nom: "Pantalon wax slim homme", categorie: "hommes", categorieLabel: "Hommes",
        reference: "AFR-PAN-005", prix: 12500, ancienPrix: null, badge: "new", badgeLabel: "Nouveau",
        note: 4.5, avis: 10,
        description: "Pantalon coupe slim en tissu wax, taille ajustable, poches latérales. Un basique moderne pour un style affirmé.",
        couleurs: [{ nom: "Bleu", hex: "#1E40AF" }],
        tailles: ["S", "M", "L", "XL"],
        images: ["images/produits/produit-05.jpg"]
    },
    {
        id: 6, nom: "Bracelet cauris argent", categorie: "accessoires", categorieLabel: "Accessoires",
        reference: "AFR-BRA-006", prix: 3600, ancienPrix: 4500, badge: "promo", badgeLabel: "Promo",
        note: 4.8, avis: 15,
        description: "Bracelet artisanal en cauris et perles argentées, réglable. Une touche d'élégance africaine pour toutes les tenues.",
        couleurs: [{ nom: "Argent", hex: "#C0C0C0" }],
        tailles: [],
        images: ["images/produits/produit-06.jpg"]
    },
    {
        id: 7, nom: "Jupe portefeuille wax", categorie: "femmes", categorieLabel: "Femmes",
        reference: "AFR-JUP-007", prix: 11000, ancienPrix: null, badge: "", badgeLabel: "",
        note: 4.4, avis: 10,
        description: "Jupe portefeuille en tissu wax, taille haute, longueur midi. Se noue sur le côté pour un ajustement parfait.",
        couleurs: [{ nom: "Rouge", hex: "#C0392B" }],
        tailles: ["XS", "S", "M", "L"],
        images: ["images/produits/produit-07.jpg"]
    },
    {
        id: 8, nom: "Tissu wax Java - 6 yards", categorie: "tissu", categorieLabel: "Tissu Wax",
        reference: "AFR-TIS-008", prix: 8000, ancienPrix: null, badge: "", badgeLabel: "",
        note: 4.7, avis: 15,
        description: "Coupon de tissu wax Java véritable, 6 yards (environ 5,5m), 100% coton. Idéal pour vos créations sur-mesure.",
        couleurs: [{ nom: "Multicolore", hex: "#D4881A" }],
        tailles: [],
        images: ["images/produits/produit-08.jpg"]
    },
    {
        id: 9, nom: "Veste wax structurée", categorie: "femmes", categorieLabel: "Femmes",
        reference: "AFR-VES-009", prix: 27500, ancienPrix: null, badge: "trend", badgeLabel: "Tendance",
        note: 5.0, avis: 10,
        description: "Veste structurée en wax, coupe cintrée, doublure satinée. Une pièce forte pour sublimer toutes vos tenues.",
        couleurs: [{ nom: "Multicolore", hex: "#553C9A" }],
        tailles: ["S", "M", "L", "XL"],
        images: ["images/produits/produit-09.jpg"]
    },
    {
        id: 10, nom: "Casquette wax brodée", categorie: "accessoires", categorieLabel: "Accessoires",
        reference: "AFR-CAS-010", prix: 4400, ancienPrix: 5500, badge: "promo", badgeLabel: "Promo",
        note: 4.3, avis: 10,
        description: "Casquette en tissu wax avec broderies, taille ajustable par sangle arrière. Accessoire idéal pour un look casual chic.",
        couleurs: [{ nom: "Multicolore", hex: "#D4881A" }],
        tailles: [],
        images: ["images/produits/produit-10.jpg"]
    },
    {
        id: 11, nom: "Ensemble 2 pièces garçon", categorie: "enfants", categorieLabel: "Enfants",
        reference: "AFR-ENF-011", prix: 13500, ancienPrix: null, badge: "new", badgeLabel: "Nouveau",
        note: 4.6, avis: 14,
        description: "Ensemble 2 pièces (haut + short) en tissu wax pour garçon. Confortable et coloré, parfait pour les grandes occasions.",
        couleurs: [{ nom: "Multicolore", hex: "#E94560" }],
        tailles: ["2-4 ans", "4-6 ans", "6-8 ans"],
        images: ["images/produits/produit-11.jpg"]
    },
    {
        id: 12, nom: "Foulard soie Bogolan", categorie: "accessoires", categorieLabel: "Accessoires",
        reference: "AFR-FOU-012", prix: 6200, ancienPrix: null, badge: "", badgeLabel: "",
        note: 4.9, avis: 15,
        description: "Foulard en soie à motifs Bogolan, finitions roulotées main. Un accessoire raffiné aux inspirations traditionnelles.",
        couleurs: [{ nom: "Multicolore", hex: "#D4881A" }],
        tailles: [],
        images: ["images/produits/produit-12.jpg"]
    }

];

/*=========================================================
        ETAT COURANT DE LA PAGE
=========================================================*/

let produitCourant = null;
let tailleSelectionnee = "";
let couleurSelectionnee = "";

/*=========================================================
        UTILITAIRES
=========================================================*/

function formatPrixProduit(prix){

    return Number(prix).toLocaleString("fr-FR") + " FCFA";

}

function genererEtoiles(note){

    const pleines = Math.floor(note);
    const demie = (note - pleines) >= 0.5;
    let html = "";

    for(let i = 0; i < pleines; i++){
        html += '<i class="fa-solid fa-star"></i>';
    }

    if(demie){
        html += '<i class="fa-solid fa-star-half-stroke"></i>';
    }

    while((html.match(/<i/g) || []).length < 5){
        html += '<i class="fa-regular fa-star"></i>';
    }

    return html;

}

/*=========================================================
        RECUPERATION DU PRODUIT DEPUIS L'URL
=========================================================*/

function recupererProduitDepuisURL(){

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id")) || 1;

    return CATALOGUE_PRODUITS.find(p => p.id === id) || CATALOGUE_PRODUITS[0];

}

/*=========================================================
        REMPLISSAGE DE LA PAGE
=========================================================*/

function remplirFicheProduit(produit){

    produitCourant = produit;

    tailleSelectionnee = "";

    couleurSelectionnee = produit.couleurs[0]?.nom || "";

    /* Titre de l'onglet */

    document.title = `${produit.nom} - AFROMODE`;

    /* Fil d'ariane */

    const breadcrumb = document.querySelector(".breadcrumb-section .breadcrumb");

    if(breadcrumb){

        breadcrumb.innerHTML = `

            <a href="index.html">Accueil</a>
            <span>›</span>
            <a href="boutique.html">Boutique</a>
            <span>›</span>
            <a href="boutique.html?categorie=${produit.categorie}">${produit.categorieLabel}</a>
            <span>›</span>
            ${produit.nom}

        `;

    }

    /* Badge */

    const badgeEl = document.querySelector(".product-info-detail .product-badge");

    if(badgeEl){

        if(produit.badge){

            badgeEl.textContent = produit.badgeLabel;

            badgeEl.className = `product-badge ${produit.badge}`;

            badgeEl.style.display = "";

        }else{

            badgeEl.style.display = "none";

        }

    }

    /* Titre + reference */

    const titre = document.querySelector(".product-info-detail h1");

    if(titre) titre.textContent = produit.nom;

    const reference = document.querySelector(".product-info-detail .reference");

    if(reference) reference.textContent = `${produit.categorieLabel} | Réf. ${produit.reference}`;

    /* Note */

    const ratingEl = document.querySelector(".product-rating");

    if(ratingEl){

        const lien = ratingEl.querySelector("a");

        ratingEl.innerHTML = genererEtoiles(produit.note) +
            `<span>${produit.note.toFixed(1)} (${produit.avis} avis)</span>`;

        if(lien) ratingEl.appendChild(lien);
        else {
            const a = document.createElement("a");
            a.href = "#avis";
            a.textContent = "Lire les avis";
            ratingEl.appendChild(a);
        }

    }

    /* Prix */

    const prixEl = document.querySelector(".product-price");

    if(prixEl){

        if(produit.ancienPrix){

            prixEl.innerHTML = `
                <span class="old-price">${formatPrixProduit(produit.ancienPrix)}</span>
                <span class="promo-price">${formatPrixProduit(produit.prix)}</span>
            `;

        }else{

            prixEl.textContent = formatPrixProduit(produit.prix);

        }

    }

    /* Description */

    const descriptionEl = document.querySelector(".product-info-detail .description");

    if(descriptionEl) descriptionEl.textContent = produit.description;

    /* Galerie */

    const photoPrincipale = document.getElementById("photo-principale");
    const listeMiniatures = document.querySelector(".thumbnail-list");

    if(photoPrincipale && listeMiniatures){

        photoPrincipale.src = produit.images[0];
        photoPrincipale.alt = produit.nom;

        listeMiniatures.innerHTML = "";

        produit.images.forEach((src, index) => {

            const img = document.createElement("img");

            img.src = src;
            img.alt = `${produit.nom} - vue ${index + 1}`;
            img.className = "thumbnail" + (index === 0 ? " active" : "");

            img.addEventListener("click", () => {

                photoPrincipale.src = src;

                listeMiniatures.querySelectorAll(".thumbnail").forEach(t => t.classList.remove("active"));

                img.classList.add("active");

            });

            listeMiniatures.appendChild(img);

        });

    }

    /* Couleurs */

    const groupeCouleur = document.querySelectorAll(".variant-group")[0];
    const zoneCouleurs = document.querySelector(".color-options");
    const texteCouleur = document.getElementById("selected-color");

    if(zoneCouleurs){

        zoneCouleurs.innerHTML = "";

        produit.couleurs.forEach((couleur, index) => {

            const bouton = document.createElement("button");

            bouton.type = "button";

            bouton.className = "color-circle" + (index === 0 ? " active" : "");

            bouton.dataset.color = couleur.nom;

            bouton.style.background = couleur.hex;

            bouton.setAttribute("aria-label", couleur.nom);

            bouton.addEventListener("click", () => {

                zoneCouleurs.querySelectorAll(".color-circle").forEach(c => c.classList.remove("active"));

                bouton.classList.add("active");

                couleurSelectionnee = couleur.nom;

                if(texteCouleur) texteCouleur.textContent = couleur.nom;

            });

            zoneCouleurs.appendChild(bouton);

        });

    }

    if(texteCouleur) texteCouleur.textContent = couleurSelectionnee;

    if(groupeCouleur) groupeCouleur.style.display = produit.couleurs.length > 1 ? "" : "none";

    /* Tailles */

    const groupeTaille = document.querySelectorAll(".variant-group")[1];
    const zoneTailles = document.querySelector(".size-options");

    if(zoneTailles){

        zoneTailles.innerHTML = "";

        produit.tailles.forEach(taille => {

            const bouton = document.createElement("button");

            bouton.type = "button";

            bouton.textContent = taille;

            bouton.addEventListener("click", () => {

                zoneTailles.querySelectorAll("button").forEach(b => b.classList.remove("active"));

                bouton.classList.add("active");

                tailleSelectionnee = taille;

            });

            zoneTailles.appendChild(bouton);

        });

    }

    if(groupeTaille){

        groupeTaille.style.display = produit.tailles.length > 0 ? "" : "none";

    }

    /* Quantité */

    const quantiteInput = document.getElementById("quantity");

    if(quantiteInput) quantiteInput.value = 1;

    /* Bouton ajouter au panier : on renseigne les données de base,
       la taille/couleur/quantité sont lues au moment du clic */

    const boutonAjouter = document.querySelector(".add-cart-btn");

    if(boutonAjouter){

        boutonAjouter.dataset.id = produit.id;
        boutonAjouter.dataset.nom = produit.nom;
        boutonAjouter.dataset.prix = produit.prix;
        boutonAjouter.dataset.image = produit.images[0];

    }

    /* Produits similaires : même catégorie en priorité,
       complété avec d'autres produits si besoin */

    const grilleSimilaires = document.querySelector(".similar-products .products-grid");

    if(grilleSimilaires){

        const memeCategorie = CATALOGUE_PRODUITS.filter(
            p => p.categorie === produit.categorie && p.id !== produit.id
        );

        const autres = CATALOGUE_PRODUITS.filter(
            p => p.categorie !== produit.categorie && p.id !== produit.id
        );

        const suggestions = [...memeCategorie, ...autres].slice(0, 4);

        grilleSimilaires.innerHTML = "";

        suggestions.forEach(p => {

            const article = document.createElement("article");

            article.className = "product-card";

            article.innerHTML = `

                <div class="product-image">
                    <a href="produit.html?id=${p.id}" class="product-image-link">
                        <img src="${p.images[0]}" alt="${p.nom}">
                    </a>
                    <button class="favorite" aria-label="Ajouter aux favoris">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>

                <div class="product-info">
                    <h3><a href="produit.html?id=${p.id}">${p.nom}</a></h3>
                    <p class="category">${p.categorieLabel}</p>
                    <p class="price">${formatPrixProduit(p.prix)}</p>
                    <button
                        class="btn-cart"
                        data-id="${p.id}"
                        data-nom="${p.nom}"
                        data-prix="${p.prix}"
                        data-image="${p.images[0]}"
                        data-taille="${p.tailles[0] || "Unique"}"
                        data-couleur="${p.couleurs[0]?.nom || "Standard"}">
                        <i class="fa-solid fa-cart-plus"></i>
                        Ajouter au panier
                    </button>
                </div>

            `;

            grilleSimilaires.appendChild(article);

        });

        if(typeof initBoutonsPanier === "function") initBoutonsPanier();
        if(typeof initFavoris === "function") initFavoris();

    }

}

/*=========================================================
        GALERIE (miniatures generées dynamiquement,
        géré directement dans remplirFicheProduit)
=========================================================*/

/*=========================================================
        QUANTITE
=========================================================*/

const boutonMoinsQte = document.getElementById("minus");
const boutonPlusQte = document.getElementById("plus");
const champQuantite = document.getElementById("quantity");

if(boutonMoinsQte && champQuantite){

    boutonMoinsQte.addEventListener("click", () => {

        const valeur = Number(champQuantite.value) || 1;

        if(valeur > 1) champQuantite.value = valeur - 1;

    });

}

if(boutonPlusQte && champQuantite){

    boutonPlusQte.addEventListener("click", () => {

        const valeur = Number(champQuantite.value) || 1;

        if(valeur < 10) champQuantite.value = valeur + 1;

    });

}

/*=========================================================
        AJOUT AU PANIER
=========================================================*/

const boutonAjouterPanier = document.querySelector(".add-cart-btn");

if(boutonAjouterPanier){

    boutonAjouterPanier.addEventListener("click", () => {

        if(!produitCourant) return;

        if(produitCourant.tailles.length > 0 && tailleSelectionnee === ""){

            afficherToast("Veuillez sélectionner une taille", "error");

            return;

        }

        const quantite = Number(champQuantite?.value) || 1;

        ajouterAuPanier({

            id: String(produitCourant.id),

            nom: produitCourant.nom,

            prix: produitCourant.prix,

            image: produitCourant.images[0],

            taille: produitCourant.tailles.length > 0 ? tailleSelectionnee : "Unique",

            couleur: couleurSelectionnee || "Standard",

            quantite: quantite

        });

    });

}

/*=========================================================
        ONGLETS (DESCRIPTION / TAILLES / AVIS)
=========================================================*/

const boutonsOnglets = document.querySelectorAll(".tab-btn");
const contenusOnglets = document.querySelectorAll(".tab-content");

boutonsOnglets.forEach(bouton => {

    bouton.addEventListener("click", () => {

        boutonsOnglets.forEach(b => b.classList.remove("active"));
        contenusOnglets.forEach(c => c.classList.remove("active"));

        bouton.classList.add("active");

        const cible = document.getElementById(bouton.dataset.tab);

        if(cible) cible.classList.add("active");

    });

});

/*=========================================================
        INITIALISATION
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const produit = recupererProduitDepuisURL();

    remplirFicheProduit(produit);

    /* Re-active le bouton favoris (icône remplacée entre-temps) */

    if(typeof initFavoris === "function") initFavoris();

});
