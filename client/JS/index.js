let startButton = document.querySelector('.start-button');
let mute = document.getElementById('icone-volume-mute');
let volume = document.getElementById('icone-volume');


// Suivi de l'état de la lecture
let lectureEnCours = false;

// Fonction pour démarrer la lecture
function demarrerLecture() {
	lecteurAudio.play();
	lectureEnCours = true;
}

// Référence au lecteur audio
let lecteurAudio = document.getElementById('audio');

// Vérification si une position de lecture a été enregistrée dans localStorage
let positionLecture = localStorage.getItem('positionLecture');

if (positionLecture) {
	// Si une position de lecture existe, il faut la régler
	lecteurAudio.currentTime = parseFloat(positionLecture);
}

// Ajout d'un gestionnaire d'événement pour sauvegarder la position de lecture lors de la fermeture de la page
window.addEventListener('beforeunload', () => {
	localStorage.setItem('positionLecture', lecteurAudio.currentTime.toString());
});

// Jouer la musique lorsque la page est chargée
window.onload = function () {
	demarrerLecture();
};


// Jouer la musique lorsque la page est chargée altéré par le gestionnaire d'événement au clic sur l'icône de volume/mute donc remplacée par celle d'au dessus
// window.onload = function() {
//   lecteurAudio.play();
// }


// Ajouter un gestionnaire d'événement au clic sur l'icône de volume/mute
volume.addEventListener('click', () => {
	if (lecteurAudio.paused) {
		lecteurAudio.play(); // Démarrer la lecture si en pause
		volume.classList.remove('fa-volume-mute'); // Retirer l'icône de mute
		volume.classList.add('fa-volume'); // Afficher l'icône de volume
		sessionStorage.setItem('lectureEnCours', 'false'); // Définir l'état de la musique en lecture

	} else {
		lecteurAudio.pause(); // Mettre en pause la lecture si en cours
		volume.classList.remove('fa-volume'); // Retirer l'icône de volume
		volume.classList.add('fa-volume-mute'); // Afficher l'icône de mute
		sessionStorage.setItem('lectureEnCours', 'true'); // Définir l'état de la musique en pause

	}
});


startButton.addEventListener('click', () => {
	// Redirirection de l'utilisateur vers une nouvelle page HTML
	window.location.href = './regle.html';

}); 
