/*****************PARTE DE ROLY********************/

const Unit = require("../models/UnitModel");


/*********************METODOS************************* */
//Insertar Unidad
exports.saveUnit = async (req, res) => {
    const unit = new Unit(req.body);
    try {
        await unit.save();
        res.json({ "message": "Nueva Unidad agregada" });
    } catch (error) {
        if (error.name == "ValidationError") {
            //res.status(400).json(error.message);
            res.json(error.message);
        }
        res.send(error);
        next();
    }
};

// Listar Unidades
exports.listUnit = async (req, res) => {
    try {
        const unit = await Unit.find({});
        res.json(unit);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Mostrar una Unidad en especifico
exports.showUnit = async (req, res, next) => {
    try {
        const unit = await Unit.findById(req.params.id);
        if (!unit) {
            res.status(404).json({
                message: "La Unidad no existe"
            });
        }
        res.json(unit);
    } catch (error) {
        res.status(400).json({
            message: "Error al procesar la peticion"
        });
        next();
    }
};

// Actualizar una Unidad
exports.updateUnit = async (req, res, next) => {
    try {
        let newUnit = req.body;
        const updateUnit = await Unit.findOneAndUpdate(
            { _id: req.params.id },
            newUnit,
            { new: true }
        );
        res.json({
            message: "Unidad Actualizada"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al procesar la peticion"
        });
        next();
    }
};

// Eliminar una Unidad
exports.deleteUnit = async (req, res, next) => {
    try {
        await Unit.findOneAndDelete(
            { _id: req.params.id }
        );
        res.json({
            message: "Unidad Eliminada"
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al procesar la peticion"
        });
        next();
    }
};