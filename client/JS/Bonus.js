
let validezButton = document.getElementById('valide');
// Sélectionner les avatars par leur classe (vous pouvez ajuster le sélecteur en fonction de votre structure HTML)
let bonus = document.querySelectorAll('.swiper-slide');
let selectedBonus = [];



// Ajouter un gestionnaire d'événements de clic à chaque avatar
bonus.forEach(function (bonusElement) {
	bonusElement.addEventListener('click', function () {
		
		
		
		// s'assurer que l'utilisateur ne sélectionne pas le même avatar deux fois
		if (!selectedBonus.includes(bonusElement)) {
			if (selectedBonus.length < 2) {
				selectedBonus.push(bonusElement);

				

				// pour indiquer visuellement la sélection
				if (selectedBonus.length === 1) {
					bonusElement.style.border = '4px solid #F9C408';
				}
				else {
					bonusElement.style.border = '4px solid #50074D';
				}
				// animation iteration count
				// Ajoutez une transition CSS pour l'effet d'animation
                bonusElement.style.animation = 'borderAnimation 3s linear infinite';
			}
		} else {
            // désélectionnez l'avatar déjà sélectionné, 
            deselectBonus(bonusElement);
        }

		// Désactiver le bouton si deux avatars n'ont pas encore été choisis
		if (selectedBonus.length == 2) {
			validezButton.disabled = false;
		} else {
			validezButton.disabled = true;
		}
	});
});

// Fonction pour désélectionner un avatar
function deselectBonus(bonusElement) {
    var index = selectedBonus.indexOf(bonusElement);
    if (index !== -1) {
        selectedBonus.splice(index, 1);
        // Supprimez le contour de l'avatar
        bonusElement.style.border = '';
        // Supprimez également l'animation
        bonusElement.style.animation = '';
    }
}


validezButton.addEventListener('click', () => {
	// Rediriger l'utilisateur vers une nouvelle page HTML
	window.location.href = './faction.html';

});