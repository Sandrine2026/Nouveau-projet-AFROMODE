/*=========================================
        CONNEXION / INSCRIPTION
==========================================*/

const btnConnexion = document.getElementById("btn-connexion");

const btnInscription = document.getElementById("btn-inscription");

const formConnexion = document.getElementById("form-connexion");

const formInscription = document.getElementById("form-inscription");

if(btnConnexion){

    btnConnexion.addEventListener("click",()=>{

        formConnexion.style.display="block";

        formInscription.style.display="none";

    });

}

if(btnInscription){

    btnInscription.addEventListener("click",()=>{

        formConnexion.style.display="none";

        formInscription.style.display="block";

    });

}
/*=========================================
        INSCRIPTION
==========================================*/

const inscription = document.getElementById("form-inscription");

if(inscription){

    inscription.addEventListener("submit",(e)=>{

        e.preventDefault();

        const utilisateur={

            nom:document.getElementById("nom").value,

            email:document.getElementById("email").value,

            password:document.getElementById("password").value

        };

        localStorage.setItem(

            "utilisateur",

            JSON.stringify(utilisateur)

        );

        alert("Inscription réussie !");

        inscription.reset();

    });

}
/*=========================================
        CONNEXION
==========================================*/

const connexion = document.getElementById("form-connexion");

if(connexion){

    connexion.addEventListener("submit",(e)=>{

        e.preventDefault();

        const email=document.getElementById("login-email").value;

        const password=document.getElementById("login-password").value;

        const utilisateur=JSON.parse(

            localStorage.getItem("utilisateur")

        );

        if(

            utilisateur &&

            utilisateur.email===email &&

            utilisateur.password===password

        ){

            alert("Bienvenue "+utilisateur.nom);

            window.location.href="index.html";

        }

        else{

            alert("Email ou mot de passe incorrect.");

        }

    });

}
