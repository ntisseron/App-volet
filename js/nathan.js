document.addEventListener("DOMContentLoaded", function () {
    const boutonsVolet = document.querySelectorAll('input[name="volet-radio"]');
    const voletImage = document.getElementById("voletImage"); // Image du volet

    boutonsVolet.forEach(bouton => {
        bouton.addEventListener("change", function () {
            if (this.checked) {
                envoyerCommandeVolet(this.value);
                mettreAJourImage(this.value);
            }
        });
    });
});

/**

 * @param {string} action - "open", "close" ou "stop".
 */
function envoyerCommandeVolet(action) {
    let apiUrl = "";

    switch (action) {
        case "open":
            apiUrl = "http://192.168.0.49/core/api/jeeApi.php?apikey=";
            break;
        case "close":
            apiUrl = "http://192.168.0.49/core/api/jeeApi.php?apikey=";
            break;
        case "stop":
            apiUrl = "http://192.168.0.49/core/api/jeeApi.php?apikey=";
            break;
        default:
            console.error("Action invalide :", action);
            return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Commande ${action} envoyée avec succès :`, data);
    })
    .catch(error => {
        console.error(`Erreur lors de l'envoi de la commande ${action} :`, error);
    });
}

/**
 * Met à jour l'image du volet en fonction de l'action sélectionnée.
 * @param {string} action - "open", "close" ou "stop".
 */
function mettreAJourImage(action) {
    const voletImage = document.getElementById("voletImage");

    switch (action) {
        case "open":
            voletImage.src = "../Images/VoletsOuverts.png";
            break;
        case "close":
            voletImage.src = "../Images/VoletsFermes.png";
            break;
        case "stop":
            voletImage.src = "../Images/Volets.png";
            break;
    }
}
