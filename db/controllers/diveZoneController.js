const mongoose = require('mongoose');
const DiveZone = require('../models/DiveZone.model');
const getIP = require('./getIP');

// Handle index actions
exports.index = function (req, res) {
    DiveZone.get(function (err, diveZone) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "diveZones retrieved successfully",
            data: diveZone
        });
    });
};

exports.new = function (req, res) {
    var diveZone = new DiveZone();

    diveZone.name = req.body.name ? req.body.name : diveZone.name;
    diveZone.boundaryPoints = req.body.positions
    diveZone.description = req.body.description
    diveZone.ip = getIP.filterIP(req);
    // save the diveZone and check for errors
    diveZone.save(function (err) {
        if (err)
            res.json(err);res.json({
            message: 'New diveZone created!',
            data: diveZone
        });
    });
};

// Handle view diveZone info
exports.view = function (req, res) {
    if( parseInt(req.params.diveZone_id) ){
        DiveZone.find({
            index: req.params.diveZone_id
        }, function (err, diveZone) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: 'diveZone details loading..',
                    data: diveZone
                });
            }
        });
    } else {
        // Names are formatted, ensure the query matches the format for matching:
        const name = req.params.diveZone_id.charAt(0).toUpperCase() + req.params.diveZone_id.slice(1).toLowerCase();
         DiveZone.find({ name: name }, function (err, diveZone) {
             if (err) {
                 res.send(err);
             } else {
                 res.json({
                     message: 'diveZone details loading..',
                     data: diveZone
                 });
             }
         });
    }
};

// Handle update diveZone info
exports.update = function (req, res) {DiveZone.findById(req.params.diveZone_id, function (err, diveZone) {
    if (err)
    res.send(err);

    diveZone.name = req.body.name ? req.body.name : diveZone.name;
    diveZone.boundaryPoints = req.body.boundaryPoints
    diveZone.description = req.body.description
    getIP.filterIP(req);

        // save the diveZone and check for errors
        diveZone.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'diveZone Info updated',
                data: diveZone
            });
        });
    });
};

// Handle delete diveZone
exports.delete = function (req, res) {
    DiveZone.remove({
        _id: req.params.diveZone_id
    }, function (err, diveZone) {
        if (err)
            res.send(err);res.json({
            status: "success",
            message: 'diveZone deleted'
        });
    });
};
