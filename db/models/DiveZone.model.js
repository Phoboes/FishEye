var mongoose = require('mongoose');

var DiveZoneSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50
    },
    boundaryPoints: {
        type: Array
    },
    description: {
        type: String,
        max: 250
    },
    ip: {
        type: String
    },

    validated: {
        type: Boolean, default: false
    },

    create_date: {
        type: Date,
        default: Date.now
    }
});

var DiveZone = module.exports = mongoose.model('DiveZone', DiveZoneSchema);
module.exports.get = function (callback, limit) {
    DiveZone.find(callback).limit(limit);
}
module.exports = DiveZone