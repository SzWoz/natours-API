const fs = require('fs');

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (val > toursData.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Properties doesnt exist',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: toursData.length,
    data: {
      tours: toursData,
    },
  });
};

exports.getTourByID = (req, res) => {
  const id = req.params.id * 1;

  const tour = toursData.find((item) => item.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newID = toursData[toursData.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  toursData.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = toursData.find((item) => item.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = toursData.find((item) => item.id === id);

  if (tour) {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } else {
    res.status(400).json({
      status: 'fail',
    });
  }
};
