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
        monsterListHTML += `<div class="monster-info">
                             <img src="${monster.image}" alt="${monster.name}">
                             <div>
                               <h3>${monster.name}</h3>
                               ${monster.stats.map(stat => `<p>${stat}</p>`).join('')}
                             </div>
                           </div>`;
    });
    monsterList.innerHTML = monsterListHTML;

    modal.style.display = 'block';
}

document.addEventListener('mouseout', function (event) {
    modal.style.display = 'none';
});