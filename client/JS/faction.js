// Fonction pour récupérer l'URL de l'avatar sélectionné depuis le serveur
async function getSelectedAvatarUrl(teamId) {
    const response = await fetch(`http://localhost:8000/team/${teamId}/avatarUrl`);
    const data = await response.json();
    return data.avatarUrl;
}

// Fonction pour afficher l'image d'avatar dans l'élément HTML correspondant
async function displayAvatar(element, teamId) {
    const avatarUrl = await getSelectedAvatarUrl(teamId);
    element.style.backgroundImage = `url(${avatarUrl})`;
    element.style.backgroundSize = 'cover'; // Redimensionner l'image pour couvrir toute la zone
    element.style.backgroundRepeat = 'no-repeat';
}

// Appelez la fonction pour afficher les avatars pour chaque équipe
document.addEventListener('DOMContentLoaded', async () => {
    // Obtenez les éléments d'avatar sur la page
    const avatarElement1 = document.getElementById('avatar1');
    const avatarElement2 = document.getElementById('avatar2');

    // Récupérez les IDs d'équipe que vous avez sélectionnés (remplacez ceci par vos valeurs)
    const teamId1 = 1; // ID de la première équipe
    const teamId2 = 2; // ID de la deuxième équipe

    // Appelez la fonction pour afficher les avatars pour chaque équipe
    await displayAvatar(avatarElement1, teamId1);
    await displayAvatar(avatarElement2, teamId2);
});


const factions = {
    Chaos: [
        { name: 'Diablotin', image: 'img/imp.gif', stats: ['HP:9', 'Attack:2', 'Defense:7'] },
        { name: 'Succube', image: 'img/succube.gif', stats: ['HP:12', 'Attack:5', 'Defense:10'] },
        { name: 'Archidémon', image: 'img/archidémon.gif', stats: ['HP:17', 'Attack:9', 'Defense:15'] }
    ],
    Humain: [
        { name: 'Chevalier', image: 'img/chevalier.gif', stats: ['HP:8', 'Attack:4', 'Defense:4'] },
        { name: 'Prêtresse', image: 'img/pretresse.gif', stats: ['HP:18', 'Attack:5', 'Defense:3'] },
        { name: 'Maître chevalier', image: 'img/swordmaster.gif', stats: ['HP:16', 'Attack:8', 'Defense:21'] }
    ],
    Mort: [
        { name: 'Zombie', image: 'img/zombie.gif', stats: ['HP:7', 'Attack:5', 'Defense:1'] },
        { name: 'Fantôme', image: 'img/fantome2.gif', stats: ['HP:10', 'Attack:9', 'Defense:3'] },
        { name: 'Death', image: 'img/faucheur.gif', stats: ['HP:16', 'Attack:15', 'Defense:5'] }
    ],
    Nature: [
        { name: 'Fée', image: 'img/pixi.gif', stats: ['HP:13', 'Attack:2', 'Defense:2'] },
        { name: 'Druide', image: 'img/druide.gif', stats: ['HP:18', 'Attack:4', 'Defense:3'] },
        { name: 'Dragon', image: 'img/dragon.gif', stats: ['HP:25', 'Attack:6', 'Defense:8'] }
    ],
    Ordre: [
        { name: 'Mage', image: 'img/mage2.gif', stats: ['HP:10', 'Attack:3', 'Defense:2'] },
        { name: 'Golem', image: 'img/golem.gif', stats: ['HP:14', 'Attack:6', 'Defense:5'] },
        { name: 'Rakshasa', image: 'img/lion.gif', stats: ['HP:19', 'Attack:8', 'Defense:7'] }
    ]
};
const modal = document.getElementById('modal');
const monsterList = document.getElementById('monsterList');

function showMonstersModal(factionKey) {
    const faction = factions[factionKey];
    updateModalBackground(factionKey);

    // Construction de la liste de monstres
    let monsterListHTML = '';
    faction.forEach(monster => {
        monsterListHTML += 
        `<div class="monster-info"> <img src="${monster.image}" alt="${monster.name}"><div> <h3>${monster.name}</h3> ${monster.stats.map(stat => `<p>${stat}</p>`).join('')}</div> </div>`;
    });
    monsterList.innerHTML = monsterListHTML;

    modal.style.display = 'block';
}


function updateModalBackground(factionKey) {
    const modal = document.getElementById('modal');
    let backgroundColor;

    switch (factionKey) {
        case 'Chaos':
            backgroundColor = '#B66436CC';
            break;
        case 'Humain':
            backgroundColor = '#DAAD55CC';
            break;
        case 'Mort':
            backgroundColor = '#9F37B9CC';
            break;
        case 'Nature':
            backgroundColor = '#7BC97ECC';
            break;
        case 'Ordre':
            backgroundColor = '#6170F1CC';
            break;
        default:
            backgroundColor = 'white'; // Couleur par défaut
            break;
    }

    modal.style.backgroundColor = backgroundColor;
}

document.addEventListener('mouseout', function (event) {
    modal.style.display = 'none';
});



let validezButton = document.getElementById('valide');

// Sélectionner les factions par leur classe 

let embleme = document.querySelectorAll('.faction');

let selectedFaction = [];

// Ajouter un gestionnaire d'événements de clic à chaque faction
embleme.forEach(function (factionElement) {
	factionElement.addEventListener('click', function () {
		

		// s'assurer que l'utilisateur ne sélectionne pas la même Faction deux fois
		if (!selectedFaction.includes(factionElement)) {
			if (selectedFaction.length < 2) {
				selectedFaction.push(factionElement);

				

				// pour indiquer visuellement la sélection
				if (selectedFaction.length === 1) {
					factionElement.style.border = '4px solid #F9C408';
				}
				else {
					factionElement.style.border = '4px solid #50074D';
				}
				// animation iteration count
				// Ajoutez une transition CSS pour l'effet d'animation
                factionElement.style.animation = 'borderAnimation 3s linear infinite';

                
			}
		} else {
            // désélectionnez la faction déjà sélectionnée, 
            deselectFaction(factionElement);
        }

		// Désactiver le bouton si deux factions n'ont pas encore été choisis
		if (selectedFaction.length == 2) {
			validezButton.disabled = false;
		} else {
			validezButton.disabled = true;
		}
	});
});

// Fonction pour désélectionner un avatar
function deselectFaction(factionElement) {
    var index = selectedFaction.indexOf(factionElement);
    if (index !== -1) {
        selectedFaction.splice(index, 1);
        // Supprimez le contour de l'avatar
        factionElement.style.border = '';
        // Supprimez également l'animation
        factionElement.style.animation = '';
    }
}


validezButton.addEventListener('click', async () => {
    if (selectedFaction.length === 2) {
        const teamId1 = 1; // ID de l'équipe 1
        const teamId2 = 2; // ID de l'équipe 2
        const faction1 = selectedFaction[0].getAttribute('data-faction'); // Faction sélectionnée pour l'équipe 1
        const faction2 = selectedFaction[1].getAttribute('data-faction'); // Faction sélectionnée pour l'équipe 2
        
        try {
            // Envoie une requête POST pour mettre à jour les factions des équipes
            const response1 = await fetch(`http://localhost:8000/updatefaction/${teamId1}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ IdFaction: faction1 })
            });

            const response2 = await fetch(`http://localhost:8000/updatefaction/${teamId2}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ IdFaction: faction2 })
            });

            // Vérifier les réponses et rediriger si nécessaire
            if (response1.ok && response2.ok) {
                // Rediriger l'utilisateur vers une nouvelle page HTML (par exemple, la page de sélection des unités)
                window.location.href = './choixunite.html';
            } else {
                console.error('Erreur lors de la mise à jour des factions');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la requête :', error);
        }
    }
});






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
        sessionStorage.setItem('musiqueEnPause', 'false'); // Définir l'état de la musique en lecture

    } else {
        lecteurAudio.pause(); // Mettre en pause la lecture si en cours
        volume.classList.remove('fa-volume'); // Retirer l'icône de volume
        volume.classList.add('fa-volume-mute'); // Afficher l'icône de mute
        sessionStorage.setItem('musiqueEnPause', 'true'); // Définir l'état de la musique en pause

    }
});
