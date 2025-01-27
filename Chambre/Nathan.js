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
}

function toggleNewContentWrapper() {
    const newContentWrapper = document.getElementById('newContentWrapper');
    const newVoletImage = document.getElementById('newVoletImage');
    if (document.querySelector('.cb').checked) {
        newContentWrapper.classList.add('yellow-background');
        newContentWrapper.classList.remove('black-background');
        newVoletImage.src = '../assets/ampoule.png';
    } else {
        newContentWrapper.classList.add('black-background');
        newContentWrapper.classList.remove('yellow-background');
        newVoletImage.src = '../assets/ampouleEteint.png';
    }
}