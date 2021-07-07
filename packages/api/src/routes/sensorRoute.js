const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const fieldController = require('../controllers/fieldController');
const checkScope = require('../middleware/acl/checkScope');
const authFarmId = require('../middleware/acl/authFarmId');
const hasFarmAccess = require('../middleware/acl/hasFarmAccess');

//here I think farm
router.get('/farm/:farm_id', authFarmId, sensorController.getSensorByFarmID());

router.get('/farm/:field_id', hasFarmAccess({ params: 'sensor_id' }), sensorController.getSensorsByFieldID());

router.post('/', hasFarmAccess({ body: 'farm_id' }), checkScope(['add:fields']), sensorController.addSensor());

router.put('/:sensor_id', hasFarmAccess({ params: 'sensor_id' }), checkScope(['edit:sensors']), sensorController.updateSensor());

router.delete('/:sensor_id', hasFarmAccess({ params: 'sensor_id' }), checkScope(['delete:sensors']), sensorController.delSensor());
