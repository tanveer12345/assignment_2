const Car = require('../models/Car');

exports.homePage = (req, res) => {
    res.render('index', { title: 'Cars',  });
  };

  exports.getCars = (req, res) => {
    Car.find((err, cars) => {
      if (err) {
        res.render('error');
      } else {
        res.render('cars', {
          title: 'All Cars',
          cars,
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
        });
      }
    });
  };