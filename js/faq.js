const questions = document.querySelectorAll(".faq-question");

questions.forEach(question => {

    question.addEventListener("click", () => {

        const item = question.parentElement;

        item.classList.toggle("active");

        const icon = question.querySelector("i");

        if(item.classList.contains("active")){

            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");

        }else{

            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");

        }

    });

});