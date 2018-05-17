const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/muber_test')
    mongoose.connection.once('open', () => done())
    .on('error', err => {
        console.warn('Warning', err);
    })
});

// drivers.ensureIndexes({'geometry.near': 'geoHaystack', type:1},{bucketSize: 5}
// Driver.createIndexes ({'geometry.near': 'geoHayStack', type: 1}, {bucketSize: 5});
// beforeEach(done => {
//     const {drivers} = mongoose.connection.collections;

//     drivers.drop()
//     .then(() => drivers.createIndexes ({'geometry.near': 'geoHaystack', type: 1}, {bucketSize: 5}))
//     .then(() => {
//         done();
//     })
//     .catch(() => {
//         done();
//     })
  
// })

beforeEach(done => {
    const {drivers} = mongoose.connection.collections;
    drivers.drop()
    .then(() => drivers.ensureIndex({'geometry.coordinates': '2dsphere'}))
    .then(() => {
        done();
    })
    .catch(() => {
        done();
    })
})

// beforeEach(done => {
//     const {drivers} = mongoose.connection.collections;
//     drivers.drop()
//     .then(() => drivers.ensureIndex({'geometry.coordinates': '2dsphere'}))
//     .then(() => {
//         done();
//     })
//     .catch(() => {
//         done();
//     })
// })