'use strict'

const models = require('../models/index');
const Usuario = models.usuario;
const Worker = models.worker;
const WorkerCategoria = models.workercategoria;
const { validationResult } = require('express-validator')

exports.createOrUpdateWorker = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors);
    } else {
        
        try {
            const anuncio = await Worker.findOrCreate({ where: {idUsuario: req.user.id}, 
                                                        defaults: {idUsuario: req.user.id,
                                                                profesion: req.body.profesion,
                                                                descripcion: req.body.descripcion,
                                                                localidad: req.body.localidad,
                                                                workercategoriaId: req.body.categoria
                                                        }})
            req.body.workercategoriaId = req.body.categoria
            await Worker.update(req.body, { where: { idUsuario: req.user.id } })
            const registeredWorker = await Worker.findOne({where: {idUsuario: req.user.id}})
            res.json(registeredWorker);
        } catch (err) {
            if (err.name.includes('ValidationError') || err.name.includes('SequelizeUniqueConstraintError')) {
                res.status(422).send(err)
            } else {
                res.status(500).send(err)
            }
        }
    }
}
exports.getWorker = async function (req, res) {
    try {
        const workerExistente = await Worker.findByPk(req.params.workercategoriaId, {
        attributes: ['profesion', 'descripcion', 'localidad']
        })
        res.json(user)
    } catch (err) {
        res.status(404).send(err)
    }
}


exports.getWorkerIdUsuario = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const workerUsuario = await Worker.findOne({where: {idUsuario: req.user.id}})
        if (!workerUsuario) {
            return res.status(404).send('No existe worker');
        }
        return res.json(workerUsuario);
    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error');
    }
}


exports.getWorkerCategorias = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const categorias = await WorkerCategoria.findAll();
        res.json(categorias);

    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error');
    }
}
exports.getWorkerBusqueda = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const workers = await Worker.findAll({
            where: {
                workercategoriaId: req.params.workercategoriaId
            }
        })
        if (!workers) {
            return res.status(404).json({ msg: 'Ningun worker encontrado' });
        }
        res.json(workers);
    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error');
    }
}
exports.deleteWorker = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const workerUsuario = await Worker.findOne({where: {idUsuario: req.user.id}})
        if (!workerUsuario) {
            return res.status(404).json({ msg: 'Trabajador no encontrado' });
        }
        await workerUsuario.destroy();
        res.json({ msg: 'Trabajador borrado' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Hubo un error');
    }
}