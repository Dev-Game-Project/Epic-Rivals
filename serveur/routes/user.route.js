const router = require('express').Router();
const userController = require('../controllers/user.controller');
// register a new user
router.post('/register', userController.createPlayer);

//get all unite
router.get('/all', userController.getAllUnite);

// recup unite
router.get('/unite/:IdUnite', userController.GetUnite);

//get all faction
router.get('/allfaction', userController.getAllFaction);

// recup player
router.get('/:Idplayer', userController.GetPlayer);

// recup avatar
router.get('/avatar/:IdAvatar', userController.Getavatar);

// recup stage
router.get('/stage/:IdStage', userController.GetStage);

// recup music
router.get('/music/:IdMusic', userController.GetMusic);

// recup faction
router.get('/faction/:IdFaction', userController.Getfaction);

// recup equipe
router.get('/team/:IdTeam', userController.GetTeam);

// associer avatar team
router.post('/associateavatar', userController.associateAvatarToTeam);

// mise à jour faction
router.put('/updatefaction/:IdTeam', userController.updateFactionForTeam);

router.post('/choose-unit', userController.chooseUnit);

// Route pour vider les équipes après la fin d'une partie
router.delete('/endgame', userController.clearSelectAfterGame);

// associer teams a player
router.put('/player/:Idplayer/team', userController.associatePlayerToTeam);

//retirer la team du player
router.put('/player/:IdPlayer/removeFromTeam', userController.removePlayerFromTeam);

// recup url
router.get('/selected-avatar/:Idteam', userController.getSelectedAvatarUrl);

// recup url unite
router.get('/faction/:IdFaction/unitImages', userController.GetUnitImagesByFaction);






module.exports = router;
