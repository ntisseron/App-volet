function toggleMode() {
    const contentWrapper = document.getElementById('contentWrapper');
    const voletImage = document.getElementById('voletImage');
    const isChecked = document.getElementById('input').checked;

    if (isChecked) {
        contentWrapper.classList.add('night-mode');
        voletImage.src = '../Images/FenetreFerme.png';
    } else {
        contentWrapper.classList.remove('night-mode');
        voletImage.src = '../Images/Volets.png';
    }

    // Envoyer requête API pour les volets
    sendVoletApiRequest(isChecked);
}

function toggleNewContentWrapper() {
    const newContentWrapper = document.getElementById('newContentWrapper');
    const newVoletImage = document.getElementById('newVoletImage');
    const isChecked = document.querySelector('.cb').checked;

    if (isChecked) {
        newContentWrapper.classList.add('yellow-background');
        newContentWrapper.classList.remove('black-background');
        newVoletImage.src = '../Images/ampoule.png';
    } else {
        newContentWrapper.classList.add('black-background');
        newContentWrapper.classList.remove('yellow-background');
        newVoletImage.src = '../Images/ampouleEteint.png';
    }

    // Envoyer requête API pour la lumière
    sendLightApiRequest(isChecked);
}

function sendVoletApiRequest(isChecked) {
    const urlOpen = 'http://192.168.0.49/core/api/jeeApi.php?apikey='; // API volet ouvert
    const urlClose = 'http://192.168.0.49/core/api/jeeApi.php?apikey='; // API volet fermé

    const url = isChecked ? urlOpen : urlClose;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors', // Ajoutez cette ligne pour les requêtes CORS
        body: JSON.stringify({ state: isChecked ? 'open' : 'close' })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function sendLightApiRequest(isChecked) {
    const urlOn = 'http://192.168.0.49/core/api/jeeApi.php?apikey='; //API pour allumer la lumière
    const urlOff = 'http://192.168.0.49/core/api/jeeApi.php?apikey='; //API pour éteindre la lumière

    const url = isChecked ? urlOn : urlOff;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors', // Ajoutez cette ligne pour les requêtes CORS
        body: JSON.stringify({ state: isChecked ? 'on' : 'off' })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function redirectToIndex() {
    window.location.href = '../index.html';
}