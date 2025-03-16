const API_URLS = {
    nathan: {
        volet: {
            open: 'http://192.168.0.49/core/api/jeeApi.php?apikey=7waeu2PYhggN36BbAPF8dNbZyrADLMZ60rpufs1IBdr3jPA9key8nqP0A0KI2qa3&type=cmd&id=556',
            close: 'http://192.168.0.49/core/api/jeeApi.php?apikey=7waeu2PYhggN36BbAPF8dNbZyrADLMZ60rpufs1IBdr3jPA9key8nqP0A0KI2qa3&type=cmd&id=557'
        },
        light: {
            on: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_NATHAN_LIGHT_ON',
            off: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_NATHAN_LIGHT_OFF'
        }
    }
};

export function sendVoletApiRequest(piece, volet, isChecked) {
    const url = isChecked ? API_URLS[piece][volet].open : API_URLS[piece][volet].close;
    console.log(`🔹 Requête volet pour ${piece} - ${volet} :`, url);

    fetch(url, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log('✅ Réponse API :', data))
        .catch(error => console.error('❌ Erreur API :', error));
}

export function sendLightApiRequest(piece, isChecked) {
    const url = isChecked ? API_URLS[piece].light.on : API_URLS[piece].light.off;
    console.log(`🔹 Requête lumière pour ${piece} :`, url);

    fetch(url, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log('✅ Réponse API :', data))
        .catch(error => console.error('❌ Erreur API :', error));
}
