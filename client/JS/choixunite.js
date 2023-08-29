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

let modal = document.querySelector('.modal');


//  forEach pour ajouter un gestionnaire d'événements à chaque croix
selectUnit1.forEach((button) => {
	button.addEventListener('click', () => {
		modal.style.display = 'flex';
        // Récupérez l'ID de la faction choisie
        const factionId = 1; // Remplacez par la vraie valeur

        // Récupérez les URLs des images des unités depuis le serveur en fonction de l'ID de la faction
        fetch(`http://localhost:8000/faction/${factionId}/unitImages`)
            .then(response => response.json())
            .then(imageUrls => updateUnitModalWithImages(imageUrls))
            .catch(error => console.error('Error fetching faction unit images:', error));
	});
});

selectUnit2.forEach((button) => {
	button.addEventListener('click', () => {
		modal.style.display = 'flex';
        // Récupérez l'ID de la faction choisie
        const factionId = 2; // Remplacez par la vraie valeur

        // Récupérez les URLs des images des unités depuis le serveur en fonction de l'ID de la faction
        fetch(`http://localhost:8000/faction/${factionId}/unitImages`)
            .then(response => response.json())
            .then(imageUrls => updateUnitModalWithImages(imageUrls))
            .catch(error => console.error('Error fetching faction unit images:', error));
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
