/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (fertilizerRoute.js) is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

const express = require('express');
const router = express.Router();
const fertilizerController = require('../controllers/fertilizerController');
const hasFarmAccess = require('../middleware/acl/hasFarmAccess');
const checkScope = require('../middleware/acl/checkScope');

//router.get('/', fertilizerController.getFertilizers());
router.get('/farm/:farm_id', hasFarmAccess({ params: 'farm_id' }), checkScope(['get:fertilizers']), fertilizerController.getFertilizers());
router.post('/farm/:farm_id', hasFarmAccess({ body: 'farm_id' }), checkScope(['add:fertilizers']), fertilizerController.addFertilizer());
router.delete('/:fertilizer_id', hasFarmAccess({ params: 'fertilizer_id' }), checkScope(['delete:fertilizers']), fertilizerController.delFertilizer());

module.exports = router;
