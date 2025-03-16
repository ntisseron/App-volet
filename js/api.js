const API_URLS = {
    nathan: {
        volet: {
            open: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_NATHAN_VOLET_OPEN',
            close: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_NATHAN_VOLET_CLOSE'
        },
        light: {
            on: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_NATHAN_LIGHT_ON',
            off: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_NATHAN_LIGHT_OFF'
        }
    },
    lisa: {
        volet: {
            open: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_LISA_VOLET_OPEN',
            close: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_LISA_VOLET_CLOSE'
        },
        light: {
            on: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_LISA_LIGHT_ON',
            off: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_LISA_LIGHT_OFF'
        }
    },
    parents: {
        volet: {
            open: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_PARENTS_VOLET_OPEN',
            close: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_PARENTS_VOLET_CLOSE'
        },
        light: {
            on: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_PARENTS_LIGHT_ON',
            off: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_PARENTS_LIGHT_OFF'
        }
    },
    amis: {
        volet: {
            open: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_AMIS_VOLET_OPEN',
            close: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_AMIS_VOLET_CLOSE'
        },
        light: {
            on: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_AMIS_LIGHT_ON',
            off: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_AMIS_LIGHT_OFF'
        }
    },
    bureau: {
        volet: {
            open: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_BUREAU_VOLET_OPEN',
            close: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_BUREAU_VOLET_CLOSE'
        },
        light: {
            on: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_BUREAU_LIGHT_ON',
            off: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_BUREAU_LIGHT_OFF'
        }
    },
    volets: {
        cuisine: {
            open: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_CUISINE_VOLET_OPEN',
            close: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_CUISINE_VOLET_CLOSE'
        },
        entree: {
            open: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_ENTREE_VOLET_OPEN',
            close: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_ENTREE_VOLET_CLOSE'
        },
        salon: {
            open: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_SALON_VOLET_OPEN',
            close: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_SALON_VOLET_CLOSE'
        },
        salon2: {
            open: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_SALON2_VOLET_OPEN',
            close: 'http://192.168.0.49/core/api/jeeApi.php?apikey=YOUR_API_KEY_FOR_SALON2_VOLET_CLOSE'
        }
    }
};

export function sendVoletApiRequest(piece, volet, isChecked) {
    const url = isChecked ? API_URLS[piece][volet].open : API_URLS[piece][volet].close;
    console.log(`URL de la requête volet pour ${piece} - ${volet} :`, url);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
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

export function sendLightApiRequest(piece, isChecked) {
    const url = isChecked ? API_URLS[piece].light.on : API_URLS[piece].light.off;
    console.log(`URL de la requête lumière pour ${piece} :`, url);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
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