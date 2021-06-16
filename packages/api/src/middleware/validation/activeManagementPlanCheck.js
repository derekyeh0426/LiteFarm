const managementPlanModel = require('../../models/managementPlanModel');

async function activeManagementPlanCheck(req, res, next) {
  const currentDate = new Date();
  const {body} = req;
  if (body.crop_variety_id) {
    const doesCropVarietalHaveAManagementPlan = await managementPlanModel.query().where({crop_variety_id: body.crop_variety_id})// check if there is a management plan that has the crop varietal
    if (doesCropVarietalHaveAManagementPlan !== null) { // crop varietal is in a management plan
      if ((!!body.harvest_date && body.harvest_date.getTime() > currentDate.getTime()) || (!!body.termination_date && body.termination_date.getTime() > currentDate.getTime())) {
        return res.status(400).send({message: 'Cannot delete! Active or future crop management plans exist for this varietal'});
      }
      if (body.seed_date.getTime() > currentDate.getTime()) { // planned crop management plan
        return res.status(400).send({message: 'Cannot delete! Active or future crop management plans exist for this varietal'});
      }
    }
  } else { // crop variety not received
    return res.status(400).send({message: 'Did not receive crop variety id'});
  }
  return next();
}
module.exports = activeManagementPlanCheck;