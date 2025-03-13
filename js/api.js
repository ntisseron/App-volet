export function sendVoletApiRequest(isChecked) {
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

export function sendLightApiRequest(isChecked) {
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