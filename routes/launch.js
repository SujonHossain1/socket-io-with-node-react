const { Router } = require('express');
const { createLaunch, getAllLaunch, getLaunch } = require('../controllers/launch');
const router = Router();

router.post('/', createLaunch);
router.get('/', getAllLaunch);
router.get('/:id', getLaunch);

module.exports = router;