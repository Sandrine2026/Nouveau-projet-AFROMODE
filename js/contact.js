/*=========================================
        FORMULAIRE CONTACT
==========================================*/

const formContact = document.getElementById("contact-form");

if(formContact){

    formContact.addEventListener("submit",(e)=>{

        e.preventDefault();

        const nom = document.getElementById("contact-nom").value.trim();

        const email = document.getElementById("contact-email").value.trim();

        const message = document.getElementById("contact-message").value.trim();

        if(nom.length < 2){

            afficherToast("Veuillez saisir votre nom","error");

            return;

        }

        if(!email.includes("@")){

            afficherToast("Adresse e-mail invalide","error");

            return;

        }

        if(message.length < 10){

            afficherToast("Votre message est trop court","error");

            return;

        }

        afficherToast("Message envoyé avec succès","success");

        formContact.reset();

    });

}
/*=========================================
        ACCORDÉON FAQ
==========================================*/

const questions = document.querySelectorAll(".faq-question");

questions.forEach(question=>{

    question.addEventListener("click",()=>{

        const item = question.parentElement;

        const actif = document.querySelector(".faq-item.active");

        if(actif && actif !== item){

            actif.classList.remove("active");

        }

        item.classList.toggle("active");

    });

});
