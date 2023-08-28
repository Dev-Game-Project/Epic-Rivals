
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


validezButton.addEventListener('click', () => {
	// Rediriger l'utilisateur vers une nouvelle page HTML
	window.location.href = './choixunite.html';

});






