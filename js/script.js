// ==========================================
// TRAVELGO - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. ANNEE AUTOMATIQUE DANS LE FOOTER
    // ==========================================

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // ==========================================
    // 2. FORMULAIRE DE RESERVATION
    // ==========================================

    const reservationForm = document.querySelector("#reservationForm");

    if (reservationForm) {

        reservationForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Récupération des champs
            const nom = document.querySelector("#nom");
            const prenom = document.querySelector("#prenom");
            const email = document.querySelector("#email");
            const destination = document.querySelector("#destination");
            const personnes = document.querySelector("#personnes");
            const depart = document.querySelector("#depart");
            const retour = document.querySelector("#retour");

            // Vérification des champs obligatoires
            if (
                nom.value.trim() === "" ||
                prenom.value.trim() === "" ||
                email.value.trim() === "" ||
                destination.value === "" ||
                personnes.value === "" ||
                depart.value === "" ||
                retour.value === ""
            ) {
                afficherMessage(
                    reservationForm,
                    "Veuillez remplir tous les champs obligatoires.",
                    "danger"
                );

                return;
            }

            // Vérification de l'adresse email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.value)) {
                afficherMessage(
                    reservationForm,
                    "Veuillez entrer une adresse email valide.",
                    "danger"
                );

                return;
            }

            // Vérification des dates
            if (new Date(retour.value) < new Date(depart.value)) {
                afficherMessage(
                    reservationForm,
                    "La date de retour doit être après la date de départ.",
                    "danger"
                );

                return;
            }

            // Message de succès
            afficherMessage(
                reservationForm,
                "Votre demande de réservation a été envoyée avec succès ! Nous vous contacterons bientôt.",
                "success"
            );

            // Réinitialiser le formulaire
            reservationForm.reset();
        });
    }


    // ==========================================
    // 3. FORMULAIRE DE CONTACT
    // ==========================================

    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const nom = document.querySelector("#nom");
            const prenom = document.querySelector("#prenom");
            const email = document.querySelector("#email");
            const sujet = document.querySelector("#sujet");
            const message = document.querySelector("#message");

            // Vérification
            if (
                nom.value.trim() === "" ||
                prenom.value.trim() === "" ||
                email.value.trim() === "" ||
                sujet.value.trim() === "" ||
                message.value.trim() === ""
            ) {
                afficherMessage(
                    contactForm,
                    "Veuillez remplir tous les champs.",
                    "danger"
                );

                return;
            }

            // Vérification email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.value)) {
                afficherMessage(
                    contactForm,
                    "Veuillez entrer une adresse email valide.",
                    "danger"
                );

                return;
            }

            // Message de succès
            afficherMessage(
                contactForm,
                "Votre message a été envoyé avec succès ! Merci de nous avoir contactés.",
                "success"
            );

            // Réinitialisation
            contactForm.reset();
        });
    }


    // ==========================================
    // 4. FONCTION POUR AFFICHER LES MESSAGES
    // ==========================================

    function afficherMessage(formulaire, texte, type) {

        // Supprimer un ancien message
        const ancienMessage = formulaire.querySelector(".form-message");

        if (ancienMessage) {
            ancienMessage.remove();
        }

        // Création du message
        const message = document.createElement("div");

        message.className = `alert alert-${type} form-message mt-3`;
        message.textContent = texte;

        // Ajouter le message au formulaire
        formulaire.appendChild(message);

        // Faire disparaître le message après 5 secondes
        setTimeout(function () {
            message.remove();
        }, 5000);
    }


    // ==========================================
    // 5. ANIMATION DES CARTES
    // ==========================================

    const cards = document.querySelectorAll(
        ".destination-card, .offer-card"
    );

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-8px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0)";
        });
    });


    // ==========================================
    // 6. DATE MINIMUM POUR LA RESERVATION
    // ==========================================

    const departInput = document.querySelector("#depart");
    const retourInput = document.querySelector("#retour");

    if (departInput && retourInput) {

        const today = new Date().toISOString().split("T")[0];

        departInput.min = today;
        retourInput.min = today;

        // Quand la date de départ change
        departInput.addEventListener("change", function () {

            retourInput.min = departInput.value;

            if (retourInput.value < departInput.value) {
                retourInput.value = "";
            }
        });
    }

});
