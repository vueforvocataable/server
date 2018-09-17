module.exports = ({init, db}) => {
    const errorMessage = require('../error_message');
    const Voca = require('../model/voca');
    const api = require('express').Router();

    api.get('/', async (req, res) => {
        try {
            let vocas = await Voca.find({})
            .sort('-date')
            .limit(7);
            
            res.status(200).json({vocas: vocas});
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    });

    api.post('/', async (req, res) => {
        let voca = req.body.voca;

        if (!voca) {
            return res.status(400).json({
                message: `${errorMessage.INVALID_QUERY_PARAMETER}: ${voca}`
            })
        }

        try {
            let savedVoca = await Voca.create({
                voca: voca
            })

            res.status(201).json({savedVoca: savedVoca});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    });

    api.delete('/:id', async (req, res) => {
        let vocaId = req.params.id;
        try {
            let voca = await Voca.where('_id')
            .equals(vocaId)
            .deleteOne();

            res.status(200).json({voca: voca});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    })

    return api;
}