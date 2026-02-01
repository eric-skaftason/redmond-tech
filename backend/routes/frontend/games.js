const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/pages/games/games.html'));
});

// Custom direct links
router.get('/flatblock', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/pages/games/flatblock/flatblock.html'));
});

// Downloads
router.get('/downloads/chess', (req, res) => {
    const filePath = path.join(__dirname, '../../../frontend/pages/games/downloads/chess.py');

    res.download(filePath, 'chess.py', (err) => {
        if (err) {
            if (!res.headersSent) {
                res.status(500).json({ message: 'Download failed' });
            }
        }
    });
});
router.get('/downloads/tic_tac_toe', (req, res) => {
    const filePath = path.join(__dirname, '../../../frontend/pages/games/downloads/tic_tac_toe.py');

    res.download(filePath, 'tic_tac_toe.py', (err) => {
        if (err) {
            if (!res.headersSent) {
                res.status(500).json({ message: 'Download failed' });
            }
        }
    });
});
router.get('/downloads/turtle_race', (req, res) => {
    const filePath = path.join(__dirname, '../../../frontend/pages/games/downloads/turtle_race.py');

    res.download(filePath, 'turtle_race.py', (err) => {
        if (err) {
            if (!res.headersSent) {
                res.status(500).json({ message: 'Download failed' });
            }
        }
    });
});


// Fallback
router.use('/', express.static(path.join(__dirname, '../../../frontend/pages/games')));

module.exports = router;