let triangleButton = document.querySelector('.triangle-button');
let lecteurAudio = document.getElementById('audio'); 
let mute = document.getElementById('icone-volume-mute');
let volume = document.getElementById('icone-volume');
let musiqueEnPause = sessionStorage.getItem('musiqueEnPause');

// Jouez la musique lorsque la page est chargée
window.onload = function () {
    lecteurAudio.play();
};

// Vérification si une position de lecture a été enregistrée dans localStorage
let positionLecture = localStorage.getItem('positionLecture');

// Si une position de lecture existe, il faut régler la position de lecture du lecteur audio
if (positionLecture) {
    lecteurAudio.currentTime = parseFloat(positionLecture);
}

// Ajout d'un gestionnaire d'événement pour sauvegarder la position de lecture lors de la fermeture de la page
window.addEventListener('beforeunload', () => {
    localStorage.setItem('positionLecture', lecteurAudio.currentTime.toString());
});

// Suivi de l'état de la lecture
let lectureEnCours = false;

// Fonction pour démarrer la lecture
function demarrerLecture() {
    lecteurAudio.play();
    lectureEnCours = true;
}
// Ajout d'un gestionnaire d'événement pour sauvegarder la position de lecture lors de la fermeture de la page
window.addEventListener('beforeunload', () => {
    localStorage.setItem('positionLecture', lecteurAudio.currentTime.toString());
});


// Ajout d'un gestionnaire d'événement au clic sur l'icône de volume/mute
volume.addEventListener('click', () => {
    if (lecteurAudio.paused) {
        lecteurAudio.play(); // Démarrer la lecture si en pause
        volume.classList.remove('fa-volume-mute'); // Retirer l'icône de mute
        volume.classList.add('fa-volume'); // Afficher l'icône de volume
        sessionStorage.setItem(musiqueEnPause, 'false'); // Définir l'état de la musique en lecture
        console.log(musiqueEnPause)

    } else {
        lecteurAudio.pause(); // Mettre en pause la lecture si en cours
        volume.classList.remove('fa-volume'); // Retirer l'icône de volume
        volume.classList.add('fa-volume-mute'); // Afficher l'icône de mute
        sessionStorage.setItem(musiqueEnPause, 'true'); // Définir l'état de la musique en pause

    }
});


triangleButton.addEventListener('click', () => {
    // pour rediriger l'utilisateur vers une nouvelle page HTML
    window.location.href = './Bonus.html';

});