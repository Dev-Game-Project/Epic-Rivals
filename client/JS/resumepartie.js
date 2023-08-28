let restart = document.querySelector('.restart');
let quit = document.querySelector('.quit');

restart.addEventListener('click', () => {
	// Rediriger l'utilisateur vers une nouvelle page HTML
	window.location.href = './Bonus.html';

});

quit.addEventListener('click', () => {
	// Rediriger l'utilisateur vers une nouvelle page HTML
	window.location.href = './index.html';

});
