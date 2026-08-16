/*==================================================
        AFROMODE — PAGE PANIER
        Contrôleur d'affichage uniquement.
        La donnée du panier (lecture/écriture/badge)
        est centralisée dans main.js (lirePanier,
        sauvegarderPanier, ajouterAuPanier,
        supprimerArticle, modifierQuantite...).
==================================================*/

const cartContainer = document.getElementById("cart-container");

const REDUCTIONS = {

    "AFRO10": 10,
    "HOMME20": 20,
    "LIVRAISON": 0

};

const FRAIS_LIVRAISON = 2500;

/*==================================================
            FORMAT PRIX
==================================================*/

function formatPrix(prix){

    return Number(prix).toLocaleString("fr-FR") + " FCFA";

}

/*==================================================
            AFFICHAGE DU PANIER
==================================================*/

function afficherPanier(){

    if(!cartContainer) return;

    const panier = lirePanier();

    if(panier.length === 0){

        cartContainer.innerHTML = `

            <div class="panier-vide">

                <i class="fa-solid fa-cart-shopping"></i>

                <h2>Votre panier est vide</h2>

                <p>Découvrez notre collection et trouvez votre bonheur.</p>

                <a href="boutique.html" class="btn btn-primary">

                    Continuer mes achats

                </a>

            </div>

        `;

        calculerTotal();

        return;

    }

    cartContainer.innerHTML = "";

    panier.forEach(article => {

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <img src="${article.image}" alt="${article.nom}">

            <div class="cart-info">

                <h3>${article.nom}</h3>

                <p>Taille : ${article.taille} &nbsp;•&nbsp; Couleur : ${article.couleur}</p>

                <strong class="cart-item-price">${formatPrix(article.prix)}</strong>

            </div>

            <div class="quantity-box">

                <button class="moins" aria-label="Diminuer la quantité">−</button>

                <span>${article.quantite}</span>

                <button class="plus" aria-label="Augmenter la quantité">+</button>

            </div>

            <div class="cart-line-total">

                ${formatPrix(article.prix * article.quantite)}

            </div>

            <button class="supprimer" aria-label="Retirer l'article">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        const boutonMoins = div.querySelector(".moins");
        const boutonPlus = div.querySelector(".plus");
        const boutonSupprimer = div.querySelector(".supprimer");

        boutonMoins.addEventListener("click", () => {

            const nouvelleQuantite = article.quantite - 1;

            if(nouvelleQuantite <= 0){

                supprimerArticle(article.id, article.taille, article.couleur);

            }else{

                modifierQuantite(article.id, article.taille, article.couleur, nouvelleQuantite);

            }

            afficherPanier();

        });

        boutonPlus.addEventListener("click", () => {

            modifierQuantite(article.id, article.taille, article.couleur, article.quantite + 1);

            afficherPanier();

        });

        boutonSupprimer.addEventListener("click", () => {

            supprimerArticle(article.id, article.taille, article.couleur);

            afficherToast(`${article.nom} retiré du panier`);

            afficherPanier();

        });

        cartContainer.appendChild(div);

    });

    calculerTotal();

}

/*==================================================
            CALCUL DU TOTAL
==================================================*/

function calculerTotal(){

    const panier = lirePanier();

    let sousTotal = 0;

    panier.forEach(article => {

        sousTotal += article.prix * article.quantite;

    });

    const codePromo = localStorage.getItem("promo");

    const pourcentageReduction = codePromo && REDUCTIONS[codePromo] !== undefined
        ? REDUCTIONS[codePromo]
        : 0;

    const montantReduction = Math.round(sousTotal * pourcentageReduction / 100);

    const livraison = panier.length > 0 ? FRAIS_LIVRAISON : 0;

    const total = sousTotal - montantReduction + livraison;

    const elSubtotal = document.getElementById("subtotal");
    const elDiscount = document.getElementById("discount");
    const elDelivery = document.getElementById("delivery");
    const elTotal = document.getElementById("total");
    const discountLine = document.getElementById("discount-line");

    if(elSubtotal) elSubtotal.textContent = formatPrix(sousTotal);

    if(elDiscount) elDiscount.textContent = "-" + formatPrix(montantReduction);

    if(elDelivery) elDelivery.textContent = panier.length > 0 ? formatPrix(livraison) : formatPrix(0);

    if(elTotal) elTotal.textContent = formatPrix(total);

    if(discountLine){

        discountLine.style.display = montantReduction > 0 ? "flex" : "none";

    }

}

/*==================================================
            CODE PROMO
==================================================*/

const promoInput = document.getElementById("promo-code");
const promoButton = document.getElementById("apply-promo");
const promoMessage = document.getElementById("promo-message");

function appliquerCodePromo(){

    if(!promoInput) return;

    const code = promoInput.value.trim().toUpperCase();

    if(REDUCTIONS[code] !== undefined){

        localStorage.setItem("promo", code);

        if(promoMessage){

            promoMessage.textContent = REDUCTIONS[code] > 0
                ? `Code appliqué : -${REDUCTIONS[code]}% sur le sous-total`
                : "Code appliqué";

            promoMessage.className = "success";

        }

        afficherToast("Code promo appliqué avec succès !");

    }else{

        localStorage.removeItem("promo");

        if(promoMessage){

            promoMessage.textContent = "Code promo invalide";

            promoMessage.className = "error";

        }

        afficherToast("Code promo invalide", "error");

    }

    calculerTotal();

}

if(promoButton){

    promoButton.addEventListener("click", appliquerCodePromo);

}

if(promoInput){

    promoInput.addEventListener("keydown", (e) => {

        if(e.key === "Enter"){

            e.preventDefault();

            appliquerCodePromo();

        }

    });

}

/*==================================================
            INITIALISATION
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    afficherPanier();

});
