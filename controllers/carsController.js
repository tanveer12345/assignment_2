const Car = require('../models/Car');
const url = require('url');

exports.homePage = (req, res) => {
    res.render('index', { title: 'Cars', user: req.user,  });
  };

  exports.getCars = (req, res) => {
    Car.find((err, cars) => {
      if (err) {
        res.render('error');
      } else {
        res.render('cars', {
          title: 'All Cars',
          cars,
          user: req.user,
        });
      }
    });
  };

  exports.admin = (req, res) => {
    Car.find((err, cars) => {
      if (err) {
        res.render('error');
      } else {
        res.render('admin', {
          title: 'Cars',
          isActive: 'admin',
          cars,
          user: req.user,
        });
      }
    });
  };

  exports.addCar = (req, res) => {
    res.render('addCar', {
      title: 'Add Car',
      user: req.user,
    });
  };
  
  exports.createCar = (req, res) => {
    try {
      const car = new Car(req.body);
      car.save();
      res.redirect('/admin');
    } catch (err) {
      console.log(err);
    }
  };

  exports.editCar = (req, res, next) => {
    Car.findById({ _id: req.params.id }, (err, car) => {
      if (err) {
        console.log(err);
      } else {
        res.render('editCar', {
          title: 'Edit',
          car,
          isActive: 'admin',
          user: req.user,
        });
      }
    });
  };

  exports.updateCar = (req, res) => {

  
    Car.update({ _id: req.params.id }, req.body, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/admin');
      }
    });
  };