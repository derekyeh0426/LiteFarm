const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const fieldController = require('../controllers/fieldController');
const checkScope = require('../middleware/acl/checkScope');
const hasFarmAccess = require('../middleware/acl/hasFarmAccess');

router.get('/farm/:farm_id', hasFarmAccess({ params: 'farm_id' }), checkScope(['get:sensors']), sensorController.getSensorByFarmID());