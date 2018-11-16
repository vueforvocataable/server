module.exports = ({init, db}) => {
    const errorMessage = require('../error_message')
    const Voca = require('../model/voca')
    const api = require('express').Router()
    const check = require('check-types')

    api.get('/', async (req, res) => {
        try {
            let vocas = await Voca.find({})
            .sort('-date')
            .limit(6)
            
            res.status(200).json({vocas: vocas})
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    })

    api.get('/template/:id', async (req, res) => {
        let vocaId = req.params.id
        let category = req.query.category

        if (check.not.string(vocaId)) {
            return res.status(400).json({
                message: `${errorMessage.INVALED_QUERY_PARAMETER}: (id)`
            })
        }

        if (check.not.string(category)) {
            return res.status(400).json({
                message: `${errorMessage.INVALED_QUERY_PARAMETER}: (category)`
            })
        }

        try {
            let query = { '_id': vocaId, category: category }
            let vocas = await Voca.findOne(query)

            res.render('show_vocas', { voca: vocas.voca})
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    })

    api.post('/', async (req, res) => {
        let voca = req.body.voca;
        let category = req.body.category

        if (check.not.string(voca)) {
            return res.status(400).json({
                message: `${errorMessage.INVALED_QUERY_PARAMETER}: (voca)`
            })
        }
        
        if (check.not.string(category)) {
            return res.status(400).json({
                message: `${errorMessage.INVALED_QUERY_PARAMETER}: (category)`
            })
        }

        try {
            let savedVoca = await Voca.create({
                voca: voca,
                category: category
            })

            res.status(201).json({savedVoca: savedVoca})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })

    api.delete('/:id', async (req, res) => {
        let vocaId = req.params.id

        if (check.not.string(vocaId)) {
            return res.status(400).json({
                message: `${errorMessage.INVALED_QUERY_PARAMETER}: (id)`
            })
        }

        try {
            let voca = await Voca.where('_id')
            .equals(vocaId)
            .deleteOne()

            res.status(200).json({voca: voca})
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    })

    return api
}