const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const fieldController = require('../controllers/fieldController');
const checkScope = require('../middleware/acl/checkScope');
const authFarmId = require('../middleware/acl/authFarmId');
const hasFarmAccess = require('../middleware/acl/hasFarmAccess');

/*
I encounter a connection refuse error, at first I thought it was a google chrome problem but turned out it was the backend never running(after asking Kika)
It's kinda weird because docker-compose initially have the backend set up correctly, but then it stopped by itself(I thought it was still running...). Unfortunately
I couldn't solve this bug because I realized this at the last day. So I can't really test the end points, but here is what I think the router, the model and how the controller should work
*/
router.get('/farm/:farm_id', authFarmId, sensorController.getSensorByFarmID());

router.get('/farm/:field_id', hasFarmAccess({ params: 'sensor_id' }), sensorController.getSensorsByFieldID());

router.post('/', hasFarmAccess({ body: 'farm_id' }), checkScope(['add:fields']), sensorController.addSensor());

router.put('/:sensor_id', hasFarmAccess({ params: 'sensor_id' }), checkScope(['edit:sensors']), sensorController.updateSensor());

router.delete('/:sensor_id', hasFarmAccess({ params: 'sensor_id' }), checkScope(['delete:sensors']), sensorController.delSensor());

module.exports = router;
