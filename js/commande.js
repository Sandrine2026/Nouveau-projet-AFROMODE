/*=========================================================
        AFROMODE — PAGE COMMANDE (CHECKOUT)
        Récapitulatif, validation, confirmation
=========================================================*/

const FRAIS_LIVRAISON_VILLE = {

    cotonou: 2500,
    porto: 3500,
    parakou: 5000,
    autre: 5000

};

/*=========================================================
        AFFICHAGE DU RECAPITULATIF
=========================================================*/

function afficherRecapitulatif(){

    const container = document.getElementById("checkout-items");

    if(!container) return;

    const panier = lirePanier();

    container.innerHTML = "";

    let sousTotal = 0;

    panier.forEach(article => {

        sousTotal += article.prix * article.quantite;

        const div = document.createElement("div");

        div.className = "checkout-item";

        div.innerHTML = `

            <img src="${article.image}" alt="${article.nom}">

            <div class="checkout-item-info">

                <h4>${article.nom}</h4>

                <p>Taille : ${article.taille} • Couleur : ${article.couleur} • Qté : ${article.quantite}</p>

            </div>

            <strong>${(article.prix * article.quantite).toLocaleString("fr-FR")} FCFA</strong>

        `;

        container.appendChild(div);

    });

    if(panier.length === 0){

        container.innerHTML = `<p class="checkout-empty">Votre panier est vide. <a href="boutique.html">Continuer mes achats</a></p>`;

    }

    calculerTotalCommande(sousTotal);

}

/*=========================================================
        CALCUL DU TOTAL
=========================================================*/

function calculerTotalCommande(sousTotalFourni){

    const panier = lirePanier();

    const sousTotal = sousTotalFourni !== undefined
        ? sousTotalFourni
        : panier.reduce((somme, a) => somme + a.prix * a.quantite, 0);

    const selectVille = document.getElementById("city");

    const ville = selectVille ? selectVille.value : "";

    const livraison = panier.length === 0
        ? 0
        : (FRAIS_LIVRAISON_VILLE[ville] || FRAIS_LIVRAISON_VILLE.cotonou);

    const total = sousTotal + livraison;

    const elSubtotal = document.getElementById("checkout-subtotal");
    const elDelivery = document.getElementById("checkout-delivery");
    const elTotal = document.getElementById("checkout-total");

    if(elSubtotal) elSubtotal.textContent = sousTotal.toLocaleString("fr-FR") + " FCFA";

    if(elDelivery) elDelivery.textContent = livraison.toLocaleString("fr-FR") + " FCFA";

    if(elTotal) elTotal.textContent = total.toLocaleString("fr-FR") + " FCFA";

}

const selectVilleCommande = document.getElementById("city");

if(selectVilleCommande){

    selectVilleCommande.addEventListener("change", () => calculerTotalCommande());

}

/*=========================================================
        VALIDATION DU FORMULAIRE
=========================================================*/

function afficherErreurChamp(champ, message){

    if(!champ) return;

    champ.classList.add("champ-invalide");

    const conteneur = champ.closest(".form-group");

    const erreur = conteneur
        ? conteneur.querySelector(".error-message")
        : document.getElementById(champ.id + "-error");

    if(erreur) erreur.textContent = message;

}

function supprimerErreurChamp(champ){

    if(!champ) return;

    champ.classList.remove("champ-invalide");

    const conteneur = champ.closest(".form-group");

    const erreur = conteneur
        ? conteneur.querySelector(".error-message")
        : document.getElementById(champ.id + "-error");

    if(erreur) erreur.textContent = "";

}

function validerFormulaireCommande(){

    let valide = true;

    const prenom = document.getElementById("firstname");
    const nom = document.getElementById("lastname");
    const telephone = document.getElementById("phone");
    const email = document.getElementById("email");
    const adresse = document.getElementById("address");
    const ville = document.getElementById("city");
    const paiement = document.querySelector("input[name='payment']:checked");

    const regexNom = /^[A-Za-zÀ-ÿ\s'-]{2,}$/;

    if(!regexNom.test(prenom.value.trim())){

        afficherErreurChamp(prenom, "Veuillez saisir un prénom valide");
        valide = false;

    }else{

        supprimerErreurChamp(prenom);

    }

    if(!regexNom.test(nom.value.trim())){

        afficherErreurChamp(nom, "Veuillez saisir un nom valide");
        valide = false;

    }else{

        supprimerErreurChamp(nom);

    }

    if(!/^[0-9+\s]{8,}$/.test(telephone.value.trim())){

        afficherErreurChamp(telephone, "Numéro invalide (min. 8 chiffres)");
        valide = false;

    }else{

        supprimerErreurChamp(telephone);

    }

    if(email && email.value.trim() !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){

        afficherErreurChamp(email, "Adresse email invalide");
        valide = false;

    }else if(email){

        supprimerErreurChamp(email);

    }

    if(adresse.value.trim().length < 10){

        afficherErreurChamp(adresse, "Merci de préciser une adresse plus complète");
        valide = false;

    }else{

        supprimerErreurChamp(adresse);

    }

    if(!ville.value){

        afficherErreurChamp(ville, "Veuillez choisir une ville");
        valide = false;

    }else{

        supprimerErreurChamp(ville);

    }

    const erreurPaiement = document.getElementById("payment-error");

    if(!paiement){

        if(erreurPaiement) erreurPaiement.textContent = "Veuillez choisir un mode de paiement";
        valide = false;

    }else if(erreurPaiement){

        erreurPaiement.textContent = "";

    }

    if(lirePanier().length === 0){

        afficherToast("Votre panier est vide", "error");
        valide = false;

    }

    return valide;

}

/*=========================================================
        GENERATION DU NUMERO DE COMMANDE
=========================================================*/

function genererNumeroCommande(){

    const numero = Math.floor(10000 + Math.random() * 89999);

    return `AFR-${numero}`;

}

/*=========================================================
        SOUMISSION DE LA COMMANDE
=========================================================*/

const formulaireCommande = document.getElementById("order-form");

if(formulaireCommande){

    formulaireCommande.addEventListener("submit", (e) => {

        e.preventDefault();

        if(!validerFormulaireCommande()) return;

        const numeroCommande = genererNumeroCommande();

        const numeroEl = document.getElementById("order-number");

        if(numeroEl) numeroEl.textContent = numeroCommande;

        viderPanier();

        const sectionCommande = document.querySelector(".checkout-section");
        const boiteConfirmation = document.getElementById("confirmation-box");

        if(sectionCommande) sectionCommande.style.display = "none";

        if(boiteConfirmation){

            boiteConfirmation.style.display = "block";

            boiteConfirmation.scrollIntoView({ behavior: "smooth" });

        }

    });

}

/*=========================================================
        INITIALISATION
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    afficherRecapitulatif();

});
