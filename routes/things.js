const express = require('express');
const router = express.Router();
const Thing = require('../models/thing.js');

router.get('/', (req, res) => {
    Thing.find({}, (err, things) => {
        res.json({ things });
    })
});

router.post('/', (req, res) => {
    const name = req.body.name || '';

    const isValid = name !== ''

    if (isValid) {
        const newThing = new Thing({
            name,
            created: new Date()
        });

        newThing.save((err) => {
            if (err) throw err;
            else {
                res.json({ success: 'success' });
            }
        });
    } else {
        res.json({ errors });
    }
});

router.put('/:id', (req, res) => {
    const name = req.body.name || '';
    const isValid = name !== ''

    if (isValid) {
        const updatedThing = {
            name: req.body.name,
        };

        Thing.findByIdAndUpdate(req.params.id, updatedThing, err => {
            if (err) throw err;
            else res.json({ success: 'success' });
        });
    } else {
        res.json({ errors });
    }
});

router.get('/:id', (req, res) => {
    Thing.findById(req.params.id, (err, thing) => {
        if (err) throw err;
        res.json({ thing });
    })
});

router.delete('/:id', (req, res) => {
    Thing.remove({_id: req.params.id}, err => {
        res.json({ success: 'success' });
    });
});

module.exports = router;