let validezButton = document.getElementById('valide');

// Sélectionner une unité 
let selectUnit = document.querySelectorAll('.button');

let modal = document.querySelector('.modal');


//  forEach pour ajouter un gestionnaire d'événements à chaque croix
selectUnit.forEach((button) => {
	button.addEventListener('click', () => {
		modal.style.display = 'flex';
	});
});


let unites = document.querySelectorAll('.unites');
let selectedUnit = [];

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


const OK = document.getElementById('valideUnit');
OK.addEventListener('click', () => {
	modal.style.display = 'none';
});

validezButton.addEventListener('click', () => {
	// Rediriger l'utilisateur vers une nouvelle page HTML
	window.location.href = './combat.html';

});
