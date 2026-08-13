/*=========================================
        RECHERCHE DYNAMIQUE
==========================================*/

const searchInput = document.getElementById("search-input");
const products = document.querySelectorAll(".product-card");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const mot = this.value.toLowerCase();

        products.forEach(product => {

            const nom = product.querySelector("h3").textContent.toLowerCase();

            const categorie = product.dataset.categorie.toLowerCase();

            if (
                nom.includes(mot) ||
                categorie.includes(mot)
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

        mettreAJourCompteur();

    });

}
/*=========================================
            CURSEUR PRIX
==========================================*/

const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");

if (priceRange) {

    priceRange.addEventListener("input", () => {

        priceValue.textContent = priceRange.value;

    });

}

/*=========================================
        COMPTEUR PRODUITS
==========================================*/

function mettreAJourCompteur() {

    const visibles = document.querySelectorAll(

        ".product-card:not([style*='display: none'])"

    );

    const compteur = document.getElementById("product-count");

    if (compteur) {

        compteur.textContent =

            visibles.length +

            " produit(s) trouvé(s)";

    }

}
/*=========================================
        FILTRES MULTI-CRITÈRES
==========================================*/

const btnFiltrer = document.getElementById("btn-filtrer");

if (btnFiltrer) {

    btnFiltrer.addEventListener("click", filtrerProduits);

}

function filtrerProduits() {

    const categorie = document.getElementById("filtre-categorie").value;

    const taille = document.getElementById("filtre-taille").value;

    const couleur = document.getElementById("filtre-couleur").value;

    const prixMax = Number(document.getElementById("price-range").value);

    products.forEach(product => {

        const categorieProduit = product.dataset.categorie;

        const tailleProduit = product.dataset.taille;

        const couleurProduit = product.dataset.couleur;

        const prixProduit = Number(product.dataset.prix);

        const categorieOK =
            categorie === "" || categorieProduit === categorie;

        const tailleOK =
            taille === "" || tailleProduit.includes(taille);

        const couleurOK =
            couleur === "" || couleurProduit.includes(couleur);

        const prixOK =
            prixProduit <= prixMax;

        if (categorieOK && tailleOK && couleurOK && prixOK) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

    mettreAJourCompteur();

}

/*=========================================
        REINITIALISER FILTRES
==========================================*/

const btnReset = document.getElementById("btn-reset");

if (btnReset) {

    btnReset.addEventListener("click", () => {

        document.getElementById("filtre-categorie").value = "";

        document.getElementById("filtre-taille").value = "";

        document.getElementById("filtre-couleur").value = "";

        document.getElementById("price-range").value = 50000;

        document.getElementById("price-value").textContent = "50000";

        products.forEach(product => {

            product.style.display = "block";

        });

        mettreAJourCompteur();

    });

}

/*=========================================
            TRI DES PRODUITS
==========================================*/

const triProduits = document.getElementById("tri-produits");

if (triProduits) {

    triProduits.addEventListener("change", trierProduits);

}

function trierProduits() {

    const grille = document.querySelector(".products-grid");

    const produits = [...document.querySelectorAll(".product-card")];

    switch (triProduits.value) {

        case "prix-asc":

            produits.sort((a, b) => {

                return Number(a.dataset.prix) -

                       Number(b.dataset.prix);

            });

        break;

        case "prix-desc":

            produits.sort((a, b) => {

                return Number(b.dataset.prix) -

                       Number(a.dataset.prix);

            });

        break;

        case "nouveautes":

            produits.sort((a, b) => {

                return b.dataset.badge.localeCompare(a.dataset.badge);

            });

        break;

        case "note":

            produits.sort((a, b) => {

                return Number(b.dataset.note) -

                       Number(a.dataset.note);

            });

        break;

    }

    produits.forEach(produit => {

        grille.appendChild(produit);

    });

}

/*=========================================
            VUE GRILLE / LISTE
==========================================*/

const btnGrille = document.getElementById("vue-grille");

const btnListe = document.getElementById("vue-liste");

const grille = document.querySelector(".products-grid");

if(btnGrille){

    btnGrille.addEventListener("click",()=>{

        grille.classList.remove("liste");

    });

}

if(btnListe){

    btnListe.addEventListener("click",()=>{

        grille.classList.add("liste");

    });

}

