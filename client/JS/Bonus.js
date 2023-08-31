// Récupérer le bouton de validation
const validezButton = document.getElementById('valide');

// Sélectionner les avatars par leur classe (vous pouvez ajuster le sélecteur en fonction de votre structure HTML)
const bonus = document.querySelectorAll('.swiper-slide');
let selectedBonus = [];

// Ajouter un gestionnaire d'événements de clic à chaque avatar
bonus.forEach(function (bonusElement) {
    bonusElement.addEventListener('click', async function () {
        // Récupérer l'ID de l'avatar sélectionné
        const avatarId = bonusElement.getAttribute('data-avatar-id');
        console.log('Avatar ID sélectionné :', avatarId);

        // Vérifier si l'avatar a déjà été sélectionné
        if (!selectedBonus.includes(avatarId)) {
            if (selectedBonus.length < 2) {
                selectedBonus.push(avatarId);

                // Ajouter une bordure pour indiquer visuellement la sélection
                if (selectedBonus.length === 1){
                bonusElement.style.border = '4px solid #F9C408';}

                else {
					bonusElement.style.border = '4px solid #50074D';
				}
                // animation iteration count
				// Ajoutez une transition CSS pour l'effet d'animation
                bonusElement.style.animation = 'borderAnimation 3s linear infinite';


                // Activer le bouton de validation si deux avatars sont sélectionnés
                if (selectedBonus.length === 2) {
                    validezButton.disabled = false;
                }
            }
        } else {
            // Désélectionner l'avatar s'il est déjà sélectionné
            deselectBonus(bonusElement);
        }
    });
});

// Fonction pour désélectionner un avatar
function deselectBonus(bonusElement) {
    const avatarId = bonusElement.getAttribute('data-avatar-id');
    const index = selectedBonus.indexOf(avatarId);
    if (index !== -1) {
        selectedBonus.splice(index, 1);
        // Supprimer le contour de l'avatar
        bonusElement.style.border = '';

        // Désactiver le bouton de validation si moins de deux avatars sont sélectionnés
        if (selectedBonus.length < 2) {
            validezButton.disabled = true;
        }
    }
}

// Gestionnaire d'événements pour le bouton de validation
validezButton.addEventListener('click', async () => {
    console.log('Bouton de validation cliqué');
    if (selectedBonus.length === 2) {
        const teamId1 = 1; // ID de l'équipe 1
        const teamId2 = 2; // ID de l'équipe 2
        const avatarIdTeam1 = selectedBonus[0]; // ID de l'avatar sélectionné pour l'équipe 1
        const avatarIdTeam2 = selectedBonus[1]; // ID de l'avatar sélectionné pour l'équipe 2
        console.log('Avatar ID équipe 1 :', avatarIdTeam1);
        console.log('Avatar ID équipe 2 :', avatarIdTeam2);

        try {
            // Envoyer une requête POST pour associer les avatars aux équipes respectives
            await fetch('http://localhost:8000/associateavatar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IdTeam: teamId1,
                    IdAvatar: avatarIdTeam1
                })
            });

            await fetch('http://localhost:8000/associateavatar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IdTeam: teamId2,
                    IdAvatar: avatarIdTeam2
                })
            });

            // Rediriger l'utilisateur vers une nouvelle page HTML (par exemple, faction.html)
            window.location.href = './faction.html';
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la requête :', error);
        }
    }
});




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

