const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const PointSchema = new Schema ({
//     type: {type: String, default: 'Point'},
//     near: {type: [Number], index: '2dsphere'}
// });

const PointSchema = new Schema ({
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number], index: '2dsphere'}
});


const DriverSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    driving: {
        type: Boolean,
        default: false
    },
    geometry: PointSchema
});


// const PointSchema = new Schema ({
//     type: {type: String, default: 'Point'},
//     coordinates: {type: [Number], index: '2dsphere'}
// });

// const DriverSchema = new Schema ({
//     email: {
//         type: String,
//         required: true
//     },
//     driving: {
//         type: Boolean,
//         default: false
//     },
//     geometry: PointSchema
// });

const Driver = mongoose.model('driver', DriverSchema);
// Driver.createIndexes ([{'geometry.near': 'geoHaystack', type: 1}, {bucketSize: 5}]);
// Driver.createIndexes ({'geometry.near': 'geoHaystack', type: 1}, {bucketSize: 5})
//  .then (() => console.log('geo index created'))
//  .catch((err) => console.log(err));

module.exports = Driver;