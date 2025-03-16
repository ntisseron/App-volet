// Vérifier que le script est bien chargé
console.log("Nathan.js chargé !");

// Attendre que le DOM soit chargé avant d'ajouter les écouteurs d'événements
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".titre").addEventListener("click", redirectToIndex);
    document.getElementById("input").addEventListener("change", toggleMode);
    document.querySelector(".cb").addEventListener("change", toggleNewContentWrapper);
});

// Fonction pour rediriger vers l'index
function redirectToIndex() {
    console.log("Redirection vers index.html...");
    window.location.href = "/index.html"; // Vérifie que le fichier existe bien
}

// Fonction pour basculer l'état du volet
function toggleMode() {
    let isChecked = document.getElementById("input").checked;
    console.log("Toggle Mode:", isChecked);

    // Appel à l'API pour gérer le volet
    sendVoletApiRequest("nathan", "volet", isChecked);

    // Si la lumière est aussi gérée par ce switch, on l'appelle ici
    sendLightApiRequest("nathan", isChecked);
}

// Fonction pour basculer le deuxième bouton (lumière ou autre fonctionnalité)
function toggleNewContentWrapper() {
    let isChecked = document.querySelector(".cb").checked;
    console.log("Toggle New Content:", isChecked);

    // Tu peux ici appeler d'autres fonctions si nécessaire
}

// Fonction pour envoyer une requête API pour le volet
function sendVoletApiRequest(piece, volet, isChecked) {
    console.log(`Envoi de la requête API : ${piece}, ${volet}, état: ${isChecked}`);
    fetch("/api/volets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            piece: piece,
            volet: volet,
            state: isChecked,
        }),
    })
    .then(response => response.json())
    .then(data => console.log("Réponse API:", data))
    .catch(error => console.error("Erreur API:", error));
}

// Fonction pour envoyer une requête API pour la lumière
function sendLightApiRequest(piece, isChecked) {
    console.log(`Envoi de la requête API pour la lumière : ${piece}, état: ${isChecked}`);
    fetch("/api/lights", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            piece: piece,
            lightState: isChecked,
        }),
    })
    .then(response => response.json())
    .then(data => console.log("Réponse API pour la lumière:", data))
    .catch(error => console.error("Erreur API pour la lumière:", error));
}
