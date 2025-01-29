function toggleMode() {
    const contentWrapper = document.getElementById('contentWrapper');
    const voletImage = document.getElementById('voletImage');
    const isChecked = document.getElementById('input').checked;

    if (isChecked) {
        contentWrapper.classList.add('night-mode');
        voletImage.src = '../assets/FenetreFerme.png';
    } else {
        contentWrapper.classList.remove('night-mode');
        voletImage.src = '../assets/Volets.png';
    }

    // Envoyer une requête API
    sendApiRequest(isChecked);
}

function toggleNewContentWrapper() {
    const newContentWrapper = document.getElementById('newContentWrapper');
    const newVoletImage = document.getElementById('newVoletImage');
    const isChecked = document.querySelector('.cb').checked;

    if (isChecked) {
        newContentWrapper.classList.add('yellow-background');
        newContentWrapper.classList.remove('black-background');
        newVoletImage.src = '../assets/ampoule.png';
    } else {
        newContentWrapper.classList.add('black-background');
        newContentWrapper.classList.remove('yellow-background');
        newVoletImage.src = '../assets/ampouleEteint.png';
    }

    // Envoyer une requête API
    sendApiRequest(isChecked);
}

function sendApiRequest(isChecked) {
    const urlOn = 'http://192.168.0.49/core/api/jeeApi.php?apikey=WPsynhMvFe6gLnEkWmqXcM3Jv66g84lm&type=cmd&id=490'; // Remplacez par l'URL de votre API pour allumer
    const urlOff = 'http://192.168.0.49/core/api/jeeApi.php?apikey=WPsynhMvFe6gLnEkWmqXcM3Jv66g84lm&type=cmd&id=491'; // Remplacez par l'URL de votre API pour éteindre

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