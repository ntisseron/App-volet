import { sendVoletApiRequest, sendLightApiRequest } from './api.js';

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

    // Envoyer requête API pour les volets de la chambre Nathan
    sendVoletApiRequest('nathan', isChecked);
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

    // Envoyer requête API pour la lumière de la chambre Nathan
    sendLightApiRequest('nathan', isChecked);
}

function redirectToIndex() {
    window.location.href = '../index.html';
 }
