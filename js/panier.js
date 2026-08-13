/*==================================================
                PANIER AFROMODE
==================================================*/

// Récupération du panier
let panier = JSON.parse(localStorage.getItem("panier")) || [];

/*==================================================
            SAUVEGARDE LOCALSTORAGE
==================================================*/

function sauvegarderPanier() {

    localStorage.setItem("panier", JSON.stringify(panier));

    mettreAJourBadge();

}

/*==================================================
                BADGE PANIER
==================================================*/

function mettreAJourBadge() {

    const badges = document.querySelectorAll(".cart-badge");

    let total = 0;

    panier.forEach(produit => {

        total += produit.quantite;

    });

    badges.forEach(badge => {

        badge.textContent = total;

    });

}

/*==================================================
            FORMAT PRIX
==================================================*/

function formatPrix(prix){

    return prix.toLocaleString("fr-FR") + " FCFA";

}
/*==================================================
            AJOUTER AU PANIER
==================================================*/

const boutonsPanier = document.querySelectorAll(".btn-cart");

boutonsPanier.forEach(bouton => {

    bouton.addEventListener("click", function () {

        const produit = {

            id: this.dataset.id,

            nom: this.dataset.nom,

            prix: Number(this.dataset.prix),

            image: this.dataset.image,

            quantite: 1

        };

        ajouterProduit(produit);

    });

});

/*==================================================
            AJOUT D'UN PRODUIT
==================================================*/

function ajouterProduit(produit){

    const index = panier.findIndex(item => item.id === produit.id);

    if(index !== -1){

        panier[index].quantite++;

    }else{

        panier.push(produit);

    }

    sauvegarderPanier();

    afficherPanier();

    alert("Produit ajouté au panier avec succès !");

}
/*==================================================
            AFFICHAGE DU PANIER
==================================================*/

function afficherPanier() {

    const container = document.getElementById("cart-container");

    if (!container) return;

    container.innerHTML = "";

    let sousTotal = 0;

    panier.forEach((produit, index) => {

        sousTotal += produit.prix * produit.quantite;

        container.innerHTML += `

        <div class="cart-item">

            <img src="${produit.image}" alt="${produit.nom}" class="cart-image">

            <div class="cart-details">

                <h3>${produit.nom}</h3>

                <p>${formatPrix(produit.prix)}</p>

            </div>

            <div class="cart-quantity">

                <button class="moins" onclick="modifierQuantite(${index},-1)">−</button>

                <span>${produit.quantite}</span>

                <button class="plus" onclick="modifierQuantite(${index},1)">+</button>

            </div>

            <div class="cart-price">

                ${formatPrix(produit.prix * produit.quantite)}

            </div>

            <button class="delete-btn"

                onclick="supprimerProduit(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

    });

    document.getElementById("subtotal").textContent = formatPrix(sousTotal);

    calculerTotal();

}
/*==================================================
            MODIFIER QUANTITÉ
==================================================*/

function modifierQuantite(index, variation){

    panier[index].quantite += variation;

    if(panier[index].quantite <= 0){

        panier.splice(index,1);

    }

    sauvegarderPanier();

    afficherPanier();

}

/*==================================================
            SUPPRIMER PRODUIT
==================================================*/

function supprimerProduit(index){

    if(confirm("Supprimer ce produit ?")){

        panier.splice(index,1);

        sauvegarderPanier();

        afficherPanier();

    }

}
/*==================================================
            CALCUL TOTAL
==================================================*/

function calculerTotal(){

    let sousTotal = 0;

    panier.forEach(produit=>{

        sousTotal += produit.prix * produit.quantite;

    });

    const livraison = panier.length > 0 ? 2500 : 0;

    const montantReduction = sousTotal * reduction / 100;

    const total = sousTotal - montantReduction + livraison;

    document.getElementById("subtotal").textContent =
        formatPrix(sousTotal);

    document.getElementById("discount").textContent =
        formatPrix(montantReduction);

    document.getElementById("delivery").textContent =
        formatPrix(livraison);

    document.getElementById("total").textContent =
        formatPrix(total);

}
/*==================================================
            INITIALISATION
==================================================*/

mettreAJourBadge();

afficherPanier();