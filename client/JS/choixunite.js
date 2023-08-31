let factionId1;
let factionId2;

// Fonction pour obtenir l'ID de faction en fonction de l'ID d'équipe
async function getFactionIdByTeamId(teamId) {
    const response = await fetch(`http://localhost:8000/team/${teamId}/factionId`);
    const data = await response.json();
    return data.factionId;
}


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
    
    try {
        factionId1 = await getFactionIdByTeamId(teamId1);
        console.log('Faction ID for team 1:', factionId1);
        
        factionId2 = await getFactionIdByTeamId(teamId2);
        console.log('Faction ID for team 2:', factionId2);
        
        // Vous avez maintenant les ID de faction pour les deux équipes, vous pouvez les utiliser comme nécessaire
    } catch (error) {
        console.error('Error fetching faction ID:', error);
    }
    
});






// Fonction pour mettre à jour la modal avec les images d'unités
function updateUnitModalWithImages(imageUrls) {
    const uniteList = document.getElementById('uniteList');

    // Parcourir les URLs d'images et les ajouter à la liste d'unités dans la modal
    for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];

        // Créer un élément <img> pour chaque image d'unité
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;

        // Ajouter la classe CSS à l'élément <img> pour le style
        imgElement.classList.add('unite-image');

        // Ajouter l'élément <img> à la liste d'unités dans la modal
        const uniteElement = document.getElementById(`unite${i + 1}`);
        uniteElement.innerHTML = ''; // Effacer le contenu précédent
        uniteElement.appendChild(imgElement);
    }
}

// Sélectionner une unité 
let selectUnit1 = document.querySelectorAll('.section1 .button');
let selectUnit2 = document.querySelectorAll('.section2 .button');
let selectedTeam;
let modal = document.querySelector('.modal');


//  forEach pour ajouter un gestionnaire d'événements à chaque croix
selectUnit1.forEach((button) => {
	button.addEventListener('click', () => {
		modal.style.display = 'flex';
        selectedTeam = 1;
        // Récupérez les URLs des images des unités depuis le serveur en fonction de l'ID de la faction
        fetch(`http://localhost:8000/faction/${factionId1}/unitImages`)
            .then(response => response.json())
            .then(imageUrls => updateUnitModalWithImages(imageUrls))
            .catch(error => console.error('Error fetching faction unit images:', error));
	});
});

selectUnit2.forEach((button) => {
	button.addEventListener('click', () => {
		modal.style.display = 'flex';
        selectedTeam = 2;
        // Récupérez les URLs des images des unités depuis le serveur en fonction de l'ID de la faction
        fetch(`http://localhost:8000/faction/${factionId2}/unitImages`)
            .then(response => response.json())
            .then(imageUrls => updateUnitModalWithImages(imageUrls))
            .catch(error => console.error('Error fetching faction unit images:', error));
	});
});






let unites = document.querySelectorAll('.unites');
let OK = document.getElementById('valideUnit');
let pseudoInput = document.querySelector('.pseudo');
let validezButton = document.getElementById('valide'); // Ajout de la sélection du bouton "COMBAT"

let selectedUnit = null;

// Désactiver le bouton "OK" initialement
OK.disabled = true;

// Fonction pour mettre à jour l'état du bouton "OK"
function updateOKButtonState() {
    // Vérification si les deux conditions sont remplies
    if (pseudoInput.value.trim() !== "" && selectedUnit !== null) {
        OK.disabled = false;
    } else {
        OK.disabled = true;
    }
}
unites.forEach(function (unitElement) {
    unitElement.addEventListener('click', async function () {
        if (selectedUnit) {
            // Si une unité est déjà sélectionnée, désélectionnez-la
            deselectUnit(selectedUnit);
        }

        // Sélectionnez l'unité cliquée
        selectedUnit = unitElement;

        // Mettez en surbrillance visuellement l'unité sélectionnée
        unitElement.style.border = '4px solid #F9C408';
        unitElement.style.animation = 'borderAnimation 3s linear infinite';

        // Appel de la fonction pour mettre à jour l'état du bouton "OK"
        updateOKButtonState();

        // Attendre que l'utilisateur entre son nom dans le champ
        await new Promise(resolve => OK.addEventListener('click', resolve));

        // Récupérer le nom du joueur entré par l'utilisateur
        const playerName = pseudoInput.value.trim();
        let teamId;
        if (selectedTeam === 1) {
            teamId = 1;
        } else if (selectedTeam === 2) {
            teamId = 2;
        }


        // Envoyer le nom du joueur et l'unité choisie au serveur pour enregistrer
        const response = await fetch('http://localhost:8000/createPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playerName,
                teamId: teamId
            })
        });

        if (response.ok) {
            console.log('Player created successfully');
        } else {
            console.error('Failed to create player');
        }
    });
});

// // Ajoutez un gestionnaire d'événements de clic à chaque unité
// unites.forEach(function (unitElement) {
//     unitElement.addEventListener('click', function () {
//         if (selectedUnit) {
//             // Si une unité est déjà sélectionnée, désélectionnez-la
//             deselectUnit(selectedUnit);
//         }

//         // Sélectionnez l'unité cliquée
//         selectedUnit = unitElement;

//         // Mis en forme de l'unité sélectionnée
//         unitElement.style.border = '4px solid #F9C408';
//         unitElement.style.animation = 'borderAnimation 3s linear infinite';

//         // Appel de la fonction pour mettre à jour l'état du bouton "OK"
//         updateOKButtonState();
//     });
// });


// Ajouter un gestionnaire d'événements de clic à chaque unité
unites.forEach(function (unitElement) {
    unitElement.addEventListener('click', function () {
        if (selectedUnit) {
            // Si une unité est déjà sélectionnée, désélectionnez-la
            deselectUnit(selectedUnit);
        }

        // Sélectionnez l'unité cliquée
        selectedUnit = unitElement;

        // Mettez en surbrillance visuellement l'unité sélectionnée
        unitElement.style.border = '4px solid #F9C408';
		unitElement.style.animation = 'borderAnimation 3s linear infinite';
    });
});

// Fonction pour désélectionner une unité
function deselectUnit(unitElement) {
    selectedUnit = null;
    unitElement.style.border = ''; // Supprimez le contour de l'unité sélectionnée
}



OK.addEventListener('click', () => {
	modal.style.display = 'none';
});

validezButton.addEventListener('click', () => {
	// Rediriger l'utilisateur vers une nouvelle page HTML
	window.location.href = './combat.html';

});


// // Liste des URL des pages que je souhaite rediriger aléatoirement
// const pageURLs = [
//     "battle.html",
//     "battle0.html",
//     "battle2.html",
//     "battle3.html",
//     "page5.html"
// ];

// // Fonction pour rediriger vers une page aléatoire
// function redirectToRandomPage() {
//     let randomIndex = Math.floor(Math.random() * pageURLs.length);
//     let randomPage = pageURLs[randomIndex];
//     window.location.href = randomPage;
// }

// // Attachez la fonction de redirection au bouton
// let validezButton = document.getElementById("valide");
// validezButton.addEventListener("click", redirectToRandomPage);
