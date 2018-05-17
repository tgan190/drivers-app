const mongoose = require('mongoose');
const Driver = require('../models/driver');
// const Driver = mongoose.model('driver');

module.exports = {
    greeting(req, res) {
       res.send({ hi: 'there' });
    },

    index(req, res, next) {
        // query string in the url
        // 'http://google.com?lng=80&lat=20'
        const {lng, lat } = req.query;
    //    Driver.geoNear(
    //             {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
    //             {spherical: true, maxDistance: 200000});
        //) 
        // .catch(next);
        // Driver.geoSearch(
        //     {type: 'Point'}, {near: [parseFloat(lng), parseFloat(lat)], 
        //         maxDistance: 200000, spherical: true,}
        // )
        const point = {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
        }
        Driver.aggregate([
            {
                '$geoNear': {
                    'near': point,
                    'distanceField': "dist.calculated",
                    'maxDistance': 200000,
                    'spherical': true                
                }  
            }
        ]).then((drivers) => res.send(drivers))
        .catch(next);
    },
 // 200000 units - metres

    create(req, res, next) {
        console.log(req.body);
        // res.send({hi: 'there'});
        const driverProps = req.body;
        Driver.create(driverProps)
        .then( driver => {
            res.send(driver);
        })
        .catch(next);
    },

    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;
        console.log('driverProps: ',driverProps);
        // Driver.findByIdAndUpdate({_id:driverId}, driverProps)
        Driver.findByIdAndUpdate(driverId, driverProps)
        .then((result) => {
            console.log('result in findByIdAndUpdate = ',result);
            Driver.findOne({_id: driverId})
            .then (driver => {
                console.log('result in subsequent findOne', driver);
                res.send(driver);
            })
           
        })
        .catch(next);
       
     },

     delete(req, res, next) {
        const driverId = req.params.id;
        // Driver.findByIdAndUpdate({_id:driverId}, driverProps)
        Driver.findByIdAndDelete(driverId)
        .then((driver) => {
            console.log('result in findByIdAndDelete = ',driver);
            res.status(204).send(driver)
        })


            // res.sendStatus(204)
            // res.status(204).send(driver)})

            // Driver.findOne({_id: driverId})
            // .then (driver => {
            //     console.log('result for findOne, after delete: ', driver);
            //     // res.send(driver);
            // });

            // Driver.findOne({_id: driverId}).count()
            // .then (count => {
            //     console.log('count for findOne, after delete: ', count);
            //     res.send({count: count});
            // });
           
        .catch(next);
       
     }
};