const router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'success',
    });
});

const diveZoneController = require('../controllers/diveZoneController');
router.route('/divezones')
    .get(diveZoneController.index)
    .post(diveZoneController.new);
    
    router.route('/diveZone/:diveZone_id')
    .get(diveZoneController.view)
    .patch(diveZoneController.update)
    .put(diveZoneController.update)
    .delete(diveZoneController.delete);
    

const  getIP = require('../controllers/getIP');
    router.route('/userIp').get(getIP.show);
    
  module.exports = router;