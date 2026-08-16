/*=========================================================
        AFROMODE — PAGE BOUTIQUE
        Recherche, filtres, tri, vue grille/liste
=========================================================*/

const grilleProduits = document.querySelector("#products-container");

const cartesProduits = () =>
    Array.from(document.querySelectorAll("#products-container .product-card"));

/*=========================================================
        RECHERCHE DYNAMIQUE
=========================================================*/

const champRechercheBoutique = document.getElementById("search-input");

if (champRechercheBoutique) {

    champRechercheBoutique.addEventListener("input", function () {

        appliquerFiltres();

    });

}

/*=========================================================
        CURSEUR PRIX
=========================================================*/

const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");

if (priceRange) {

    priceRange.addEventListener("input", () => {

        if (priceValue) {

            priceValue.textContent = Number(priceRange.value).toLocaleString("fr-FR");

        }

        appliquerFiltres();

    });

}

/*=========================================================
        LECTURE DES CASES COCHEES PAR GROUPE
=========================================================*/

function valeursCochees(nomFiltre) {

    const groupe = document.querySelector(`.filter-group[data-filter="${nomFiltre}"]`);

    if (!groupe) return [];

    return Array.from(

        groupe.querySelectorAll("input[type='checkbox']:checked")

    ).map(input => input.value.toLowerCase());

}

/*=========================================================
        COMPTEUR PRODUITS
=========================================================*/

function mettreAJourCompteur(nombreVisibles) {

    const compteur = document.getElementById("product-count");

    if (compteur) {

        compteur.textContent =
            nombreVisibles + (nombreVisibles > 1 ? " produits trouvés" : " produit trouvé");

    }

}

/*=========================================================
        APPLICATION DES FILTRES (+ recherche)
=========================================================*/

function appliquerFiltres() {

    const categories = valeursCochees("categorie");
    const tailles = valeursCochees("taille");
    const couleurs = valeursCochees("couleur");
    const statuts = valeursCochees("statut");

    const prixMax = priceRange ? Number(priceRange.value) : Infinity;

    const mot = champRechercheBoutique
        ? champRechercheBoutique.value.trim().toLowerCase()
        : "";

    let visibles = 0;

    cartesProduits().forEach(carte => {

        const nomProduit = carte.querySelector("h3")?.textContent.trim().toLowerCase() || "";
        const categorieProduit = (carte.dataset.categorie || "").toLowerCase();
        const taillesProduit = (carte.dataset.taille || "").toLowerCase().split(" ");
        const couleurProduit = (carte.dataset.couleur || "").toLowerCase();
        const prixProduit = Number(carte.dataset.prix) || 0;
        const badgeProduit = (carte.dataset.badge || "").toLowerCase();

        const rechercheOK =
            mot === "" ||
            nomProduit.includes(mot) ||
            categorieProduit.includes(mot);

        const categorieOK =
            categories.length === 0 || categories.includes(categorieProduit);

        const tailleOK =
            tailles.length === 0 ||
            tailles.some(t => taillesProduit.includes(t));

        const couleurOK =
            couleurs.length === 0 || couleurs.includes(couleurProduit);

        const prixOK = prixProduit <= prixMax;

        const statutOK =
            statuts.length === 0 || statuts.includes(badgeProduit);

        const estVisible =
            rechercheOK && categorieOK && tailleOK &&
            couleurOK && prixOK && statutOK;

        carte.style.display = estVisible ? "" : "none";

        if (estVisible) visibles++;

    });

    mettreAJourCompteur(visibles);

}

/*=========================================================
        BOUTON "APPLIQUER LES FILTRES"
=========================================================*/

const btnFiltrer = document.getElementById("btn-filtrer");

if (btnFiltrer) {

    btnFiltrer.addEventListener("click", appliquerFiltres);

}

/* Filtrage instantané dès qu'une case est cochée/décochée */

document.querySelectorAll(".filter-group input[type='checkbox']").forEach(input => {

    input.addEventListener("change", appliquerFiltres);

});

/*=========================================================
        REINITIALISER FILTRES
=========================================================*/

const btnReset = document.getElementById("btn-reset");

if (btnReset) {

    btnReset.addEventListener("click", () => {

        document.querySelectorAll(".filter-group input[type='checkbox']").forEach(input => {

            input.checked = false;

        });

        if (priceRange) {

            priceRange.value = priceRange.max || 50000;

            if (priceValue) {

                priceValue.textContent = Number(priceRange.value).toLocaleString("fr-FR");

            }

        }

        if (champRechercheBoutique) {

            champRechercheBoutique.value = "";

        }

        appliquerFiltres();

    });

}

/*=========================================================
        TRI DES PRODUITS
=========================================================*/

const triProduits = document.getElementById("tri-produits");

if (triProduits) {

    triProduits.addEventListener("change", trierProduits);

}

function trierProduits() {

    if (!grilleProduits) return;

    const produits = cartesProduits();

    switch (triProduits.value) {

        case "price-asc":

            produits.sort((a, b) =>
                Number(a.dataset.prix) - Number(b.dataset.prix)
            );

            break;

        case "price-desc":

            produits.sort((a, b) =>
                Number(b.dataset.prix) - Number(a.dataset.prix)
            );

            break;

        case "new":

            produits.sort((a, b) => {

                const aNew = a.dataset.badge === "nouveau" ? 1 : 0;
                const bNew = b.dataset.badge === "nouveau" ? 1 : 0;

                return bNew - aNew;

            });

            break;

        case "rating":

            produits.sort((a, b) =>
                Number(b.dataset.note) - Number(a.dataset.note)
            );

            break;

        default:

            produits.sort((a, b) => {

                const idA = a.querySelector(".btn-cart")?.dataset.id || 0;
                const idB = b.querySelector(".btn-cart")?.dataset.id || 0;

                return Number(idA) - Number(idB);

            });

    }

    produits.forEach(produit => {

        grilleProduits.appendChild(produit);

    });

}

/*=========================================================
        VUE GRILLE / LISTE
=========================================================*/

const btnGrille = document.getElementById("vue-grille");
const btnListe = document.getElementById("vue-liste");

if (btnGrille) {

    btnGrille.addEventListener("click", () => {

        grilleProduits?.classList.remove("liste");

        btnGrille.classList.add("active");
        btnListe?.classList.remove("active");

    });

}

if (btnListe) {

    btnListe.addEventListener("click", () => {

        grilleProduits?.classList.add("liste");

        btnListe.classList.add("active");
        btnGrille?.classList.remove("active");

    });

}

/*=========================================================
        LECTURE D'UN PARAMETRE D'URL (ex: boutique.html?categorie=hommes)
=========================================================*/

function appliquerFiltreDepuisURL() {

    const params = new URLSearchParams(window.location.search);
    const categorie = params.get("categorie");

    if (!categorie) return;

    const cases = document.querySelectorAll(
        `.filter-group[data-filter="categorie"] input[type="checkbox"]`
    );

    cases.forEach(input => {

        if (input.value.toLowerCase() === categorie.toLowerCase()) {

            input.checked = true;

        }

    });

}

/*=========================================================
        INITIALISATION
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    appliquerFiltreDepuisURL();

    appliquerFiltres();

    btnGrille?.classList.add("active");

});
