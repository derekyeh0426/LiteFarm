const baseController = require('../controllers/baseController');
const sensorModel = require('../models/sensorModel');
const fieldController = require('../controllers/fieldController');
const { transaction, Model } = require('objection');

const sensorController = {

    addSensor() {
        return async (req, res, next) => {
          const trx = await transaction.start(Model.knex());
          try {
            const result = await this.postWithResponse(req, trx);
            if (result.sensor_name.length === 0 || Object.keys(result.point).length < 1) {
              await trx.rollback();
              return res.sendStatus(403);
            } else {
              await trx.commit();
              res.status(201).send(result);
              req.field = { sensorId: result.sensor_id, point: result.point }
              next();
            }
          } catch (error) {
            //handle more exceptions
            await trx.rollback();
            res.status(400).json({
              error,
            });
          }
        };
      },

      delSensor() {
        return async (req, res) => {
          const trx = await transaction.start(Model.knex());
          try {
            const isDeleted = await baseController.delete(sensorModel, req.params.sensor_id, req, { trx });
            await trx.commit();
            if (isDeleted) {
              res.sendStatus(200);
            } else {
              res.sendStatus(404);
            }
          } catch (error) {
            await trx.rollback();
            res.status(400).json({
              error,
            });
          }
        };
      },
    
      updateSensor() {
        return async (req, res) => {
          const trx = await transaction.start(Model.knex());
          try {
            const user_id = req.user.user_id;
            const updated = await baseController.put(sensorModel, req.params.sensor_id, req.body, req, { trx });
            await trx.commit();
            if (!updated.length) {
              await trx.rollback();
              res.sendStatus(404);
            } else if (updated[0].sensor_name.length === 0 ||updated[0].sensor_id === null ||updated[0].sensor_lat === null ||updated[0].sensor_lng === null) {
              await trx.rollback();
              res.sendStatus(403);
            }
    
            else {
              res.status(200).send(updated);
            }
    
          } catch (error) {
            await trx.rollback();
            res.status(400).json({
              error,
            });
          }
        }
      },

    //This function utilizes the getFieldByFarmID in fieldcontroller, I figure it's kinda handy to just use that function
    getSensorByFarmID() {
        return async (req, res) => {
          try {
            const farm_id = req.params.farm_id;
            const rows = await fieldController.getFieldByFarmID(farm_id);
            if (!rows.length) {
              let sensorRows = [];
              for (i = 0 ; i < rows.length; i ++){
                sensorRows.push(await this.getByForeignKey(rows[i].field_id));
              }
              res.state(200).send(sensorRows);
            }
          } catch (error) {
            //handle more exceptions
            res.status(400).json({
              error,
            });
          }
        };
      },

      getSensorsByFieldID() {
        return async (req, res) => {
          try {
            const field_id = req.params.field_id;
            const rows = await this.getByForeignKey(field_id);
            if (!rows.length) {
              res.status(200).send(rows);
            }
          } catch (error) {
            //handle more exceptions
            res.status(400).json({
              error,
            });
          }
        };
      },

    async getByForeignKey(field_id) {

        const sensors = await sensorModel.query().whereNotDeleted().select('*').from('sensor').where('sensor.field_id', field_id);
    
        return sensors;
      },

    async postWithResponse(req, trx) {
        const id_column = sensorModel.idColumn;
        req.body[id_column] = uuidv4();
        const user_id = req.user.user_id;
        return await baseController.postWithResponse(sensorModel, req.body, req, { trx });
    }
}



module.exports = sensorController;