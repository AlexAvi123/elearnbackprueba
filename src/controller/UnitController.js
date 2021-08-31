/*****************PARTE DE ROLY********************/

const Unit = require("../models/UnitModel");


class UnitController {

  async saveUnit(_unit) {
    try {
      var unit = new Unit(_unit);
      await unit.save();
      return { res: "ok" }
    } catch (error) {
      return error
    }
  }

  async getIdUnit(unit, module, book) {
    try {
      var unit_result = await Unit.findOne({ "unit": unit, "module": module, "book": book });
      return unit_result._id;
    } catch (error) {
      return 0
    }
  }

}

module.exports = UnitController;
