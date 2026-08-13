/*=========================================
        GALERIE PRODUIT
==========================================*/

const photoPrincipale = document.getElementById("photo-principale");
const miniatures = document.querySelectorAll(".miniature");

miniatures.forEach(miniature => {

    miniature.addEventListener("click", () => {

        photoPrincipale.src = miniature.src;

        miniatures.forEach(img => {

            img.classList.remove("active");

        });

        miniature.classList.add("active");

    });

});
/*=========================================
        TAILLES
==========================================*/

let tailleSelectionnee = "";

const tailles = document.querySelectorAll(".taille");

tailles.forEach(taille => {

    taille.addEventListener("click", () => {

        tailles.forEach(btn => {

            btn.classList.remove("active");

        });

        taille.classList.add("active");

        tailleSelectionnee = taille.dataset.taille;

    });

});
/*=========================================
        COULEURS
==========================================*/

let couleurSelectionnee = "";

const couleurs = document.querySelectorAll(".couleur");

couleurs.forEach(couleur => {

    couleur.addEventListener("click", () => {

        couleurs.forEach(btn => {

            btn.classList.remove("active");

        });

        couleur.classList.add("active");

        couleurSelectionnee = couleur.dataset.couleur;

    });

});
/*=========================================
    AJOUT AU PANIER
==========================================*/

const boutonAjouter = document.getElementById("btn-ajouter-panier");

if (boutonAjouter) {

    boutonAjouter.addEventListener("click", () => {

        if (tailleSelectionnee === "") {

            afficherToast(

                "Veuillez sélectionner une taille",

                "error"

            );

            return;

        }

        ajouterAuPanier({

            id: 1,

            nom: "Robe Wax Adinkra",

            prix: 18500,

            image: "images/produits/produit-01.jpg",

            taille: tailleSelectionnee,

            couleur: couleurSelectionnee || "Rouge",

            quantite: 1

        });

    });

}
