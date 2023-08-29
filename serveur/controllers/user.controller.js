const mysql = require('mysql');
const conn =mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
})

//register a new player
const createPlayer = (req, res) => {
    //Utilise req.body de body-parser
    const {namePlayer,expPlayer} = req.body;
    // verifier si les champs sont remplis
    if(!namePlayer){
        return res.status(400).json({
            error: 'nom manquant',
        })

    }
    const query = 'INSERT INTO player (namePlayer,expPlayer) VALUES (?,?)';
    conn.query(query, [namePlayer, expPlayer], (err) => {
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            res.status(200).json({ message: 'Utilisateur enregistré'});
        }
    });
};

// get all unite
const getAllUnite = (req, res) =>{
    const query = 'SELECT * FROM unite';
    conn.query(query, (err, result) =>{
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            res.status(200).json({ result});
        }
    })
}

// select une unite
const GetUnite = (req, res) => {
    const uniteid = req.params.IdUnite;

    const query = 'SELECT * FROM unite WHERE IdUnite = ?';
    conn.query(query, [uniteid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: 'unite non trouvé' });
            }
            const uniteData = results[0]; // Première ligne de résultats contient les données du joueur
            res.status(200).json(uniteData);
        }
    });
};

// select un joueur
const GetPlayer = (req, res) => {
    const id = req.params.Idplayer;

    const query = 'SELECT * FROM player WHERE Idplayer = ?';
    conn.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: 'Joueur non trouvé' });
            }
            const playerData = results[0]; // Première ligne de résultats contient les données du joueur
            res.status(200).json(playerData);
        }
    });
};

// select un avatar
const Getavatar = (req, res) => {
    const avatarid = req.params.IdAvatar;

    const query = 'SELECT * FROM avatar WHERE IdAvatar = ?';
    conn.query(query, [avatarid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: 'avatar non trouvé' });
            }
            const avatarData = results[0]; // Première ligne de résultats contient les données de l'avatar
            res.status(200).json(avatarData);
        }
    });
};

// select stage
const GetStage = (req, res) => {
    const stageid = req.params.IdStage;

    const query = 'SELECT * FROM stage WHERE IdStage = ?';
    conn.query(query, [stageid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: 'stage non trouvé' });
            }
            const stageData = results[0]; // Première ligne de résultats contient les données de l'avatar
            res.status(200).json(stageData);
        }
    });
};


// select music
const GetMusic = (req, res) => {
    const musicid = req.params.IdMusic;

    const query = 'SELECT * FROM music WHERE IdMusic = ?';
    conn.query(query, [musicid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: 'music non trouvé' });
            }
            const musicData = results[0]; // Première ligne de résultats contient les données de l'avatar
            res.status(200).json(musicData);
        }
    });
};

// select faction
const Getfaction = (req, res) => {
    const factionid = req.params.IdFaction;

    const query = 'SELECT * FROM faction WHERE IdFaction = ?';
    conn.query(query, [factionid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: 'faction non trouvé' });
            }
            const factionData = results[0]; // Première ligne de résultats contient les données de l'avatar
            res.status(200).json(factionData);
        }
    });
};


// select team
const GetTeam = (req, res) => {
    const Teamid = req.params.IdTeam;

    const query = 'SELECT * FROM team WHERE IdTeam = ?';
    conn.query(query, [Teamid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: 'team non trouvé' });
            }
            const teamData = results[0]; // Première ligne de résultats contient les données de l'avatar
            res.status(200).json(teamData);
        }
    });
};

const getAllFaction = (req, res) =>{
    const query = 'SELECT * FROM faction';
    conn.query(query, (err, result) =>{
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            res.status(200).json({ result});
        }
    })
}



const associateAvatarToTeam = (req, res) => {
    const teamId = req.body.IdTeam;
    const avatarId = req.body.IdAvatar;
    const defaultFactionId = 0; // ID de la faction par défaut
    console.log('teamId:', teamId);
    console.log('avatarId:', avatarId);

    // Insérez une nouvelle entrée dans la table select_ avec la faction par défaut
    const insertSelectQuery = 'INSERT INTO select_ (IdTeam, IdAvatar, IdFaction) VALUES (?, ?, ?)';

    conn.query(insertSelectQuery, [teamId, avatarId, defaultFactionId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Avatar associé à l\'équipe avec succès' });
        }
    });
};


// Mettre à jour l'association de faction pour une équipe
const updateFactionForTeam = (req, res) => {
    const teamId = req.params.IdTeam;
    const factionId = req.body.IdFaction;

    // Mettez à jour l'enregistrement correspondant dans la table select_
    const updateSelectQuery = 'UPDATE select_ SET IdFaction = ? WHERE IdTeam = ?';

    conn.query(updateSelectQuery, [factionId, teamId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        } else {
            res.status(200).json({ message: 'Association de faction mise à jour avec succès pour l\'équipe' });
        }
    });
};


const chooseUnit = (req, res) => {
    const playerId = req.body.Idplayer; // L'ID du joueur qui choisit l'unité
    const uniteId = req.body.IdUnite;   // L'ID de l'unité choisie

    // Insérer un enregistrement dans la table choose
    const insertQuery = 'INSERT INTO choose (Idplayer, IdUnite) VALUES (?, ?)';
    conn.query(insertQuery, [playerId, uniteId], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Unité choisie avec succès' });
        }
    });
};



const associatePlayerToTeam = (req, res) => {
    const playerId = req.params.Idplayer;
    const teamId = req.body.IdTeam;

    // Mettez à jour le joueur avec l'ID de l'équipe
    const updatePlayerQuery = 'UPDATE player SET IdTeam = ? WHERE Idplayer = ?';
    conn.query(updatePlayerQuery, [teamId, playerId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Joueur associé à l\'équipe avec succès' });
    });
};




const removePlayerFromTeam = (req, res) => {
    const playerId = req.params.IdPlayer;

    const updatePlayerQuery = 'UPDATE player SET IdTeam = NULL WHERE Idplayer = ?';

    conn.query(updatePlayerQuery, [playerId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Joueur retiré de l\'équipe avec succès' });
        }
    });
};






const clearSelectAfterGame = (req, res) => {
    const deleteSelectQuery = 'DELETE FROM select_';
    conn.query(deleteSelectQuery, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        res.status(200).json({ message: 'Table select_ vidée avec succès après la fin de la partie' });
    });
};





const getSelectedAvatarUrl = (teamId, callback) => {
    const query = `
        SELECT avatar.urlAvatar
        FROM select_ 
        INNER JOIN avatar ON select_.IdAvatar = avatar.IdAvatar
        WHERE select_.IdTeam = ?;
    `;
    conn.query(query, [teamId], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            if (results.length === 0) {
                callback(null, null); // Aucun avatar sélectionné pour cette équipe
            } else {
                const avatarData = results[0];
                callback(null, avatarData.imageUrl);
            }
        }
    });
};

const GetUnitImagesByFaction = (req, res) => {
    const factionId = req.params.IdFaction;

    const query = `
        SELECT DISTINCT unite.urlUnite
        FROM unite
        INNER JOIN comporte ON unite.IdUnite = comporte.IdUnite
        WHERE comporte.IdFaction = ?
        LIMIT 3;
    `;

    conn.query(query, [factionId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            const imageUrls = results.map(unit => unit.urlUnite);
            res.status(200).json(imageUrls);
        }
    });
};





module.exports = {
    createPlayer, 
    getAllUnite,
    GetPlayer,
    Getavatar,
    GetStage,
    GetMusic,
    Getfaction,
    getAllFaction,
    GetTeam,
    GetUnite,
    associateAvatarToTeam,
    updateFactionForTeam,
    chooseUnit,
    clearSelectAfterGame,
    associatePlayerToTeam,
    removePlayerFromTeam,
    getSelectedAvatarUrl,
    GetUnitImagesByFaction,
};