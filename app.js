const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: toursData.length,
    data: {
      tours: toursData,
    },
  });
};

const getTourByID = (req, res) => {
  const id = req.params.id * 1;

  const tour = toursData.find((item) => item.id === id);

  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } else {
    res.status(400).json({
      status: 'fail',
    });
  }
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = toursData.find((item) => item.id === id);

  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour: 'updated tour',
      },
    });
  } else {
    res.status(400).json({
      status: 'fail',
    });
  }
};

const deleteTour = (req, res) => {
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

const getUser = (req, res) => {
  res.status(500);
};
const getAllUsers = (req, res) => {
  res.status(500);
};
const createUser = (req, res) => {
  res.status(500);
};
const updateUser = (req, res) => {
  res.status(500);
};
const deleteUser = (req, res) => {
  res.status(500);
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log('running');
});
