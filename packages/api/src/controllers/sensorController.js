const sensorModel = require('../models/sensorModel');
const fieldController = require('../controllers/fieldController');
const { transaction, Model } = require('objection');

const sensorController = {

    addSensor() {
        return async (req, res, next) => {
          const trx = await transaction.start(Model.knex());
          try {
            const result = await this.postWithResponse(req, trx);
            if (result.field_name.length === 0 || Object.keys(result.grid_points).length < 3) {
              await trx.rollback();
              return res.sendStatus(403);
            } else {
              await trx.commit();
              res.status(201).send(result);
              req.field = { fieldId: result.field_id, point: result.grid_points[0] }
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
            const isDeleted = await baseController.delete(fieldModel, req.params.field_id, req, { trx });
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
            const updated = await baseController.put(fieldModel, req.params.field_id, req.body, req, { trx });
            await trx.commit();
            if (!updated.length) {
              res.sendStatus(404);
            } else if (updated[0].field_name.length === 0) {
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

    getSensorByFarmID() {
        return async (req, res) => {
          try {
            const farm_id = req.params.farm_id;
            const rows = await fieldController.getFieldByFarmID(farm_id);
            if (!rows.length) {
              res.status(200).send(rows);
            } else {
              let sensorRows = [];
              for (i = 0 ; i < rows.length; i ++){
                sensorRows.push(await sensorController.getByForeignKey(rows.field_id));
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

    async getByForeignKey(field_id) {

        const sensors = await sensorModel.query().whereNotDeleted().select('*').from('sensor').where('sensor.field_id', field_id);
    
        return sensors;
      },
}



module.exports = sensorController;