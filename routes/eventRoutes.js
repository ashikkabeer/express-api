const router = require('express').Router();



const EventControls = require('../event/eventControl');

router.post('/create', EventControls.create);
router.get('/', EventControls.delete);
router.delete('/:id', EventControls.delete);
module.exports = router;
