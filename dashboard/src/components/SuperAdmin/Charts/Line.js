import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import User from "../../authUserLink";
import Product from "../../authProductLink";
import Event from "../../authEventsLink";
import Pet from "../../authPetLink"
import Veterinary from "../../authVeterinary"

const { Api422Error } = require('../../../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../../../utilities/Errors/BaseError');

const LineChart = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [pets, setPets] = useState([]);
  const [veterinaries, setVeterinary] = useState([]);

  const options = {
    title: 'Total Users and Products Over Time',
    curveType: 'function',
    legend: { position: 'bottom' },
  };

  useEffect(() => {
    // Fetch user data
    User.getAllUser()
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error,res) => {
        if (error.response && error.response.status === 403) {
          res.status(httpStatusCodes.UNPROCESSABLE).send({
            message: new Api422Error(error.message),
          });
        }
      });

    // Fetch product data
    Product.getAllProducts()
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error,res) => {
        if (error.response && error.response.status === 403) {
          res.status(httpStatusCodes.UNPROCESSABLE).send({
            message: new Api422Error(error.message),
          });
        }
      });
      Event.getAllEvents()
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error,res) => {
        if (error.response && error.response.status === 403) {
          res.status(httpStatusCodes.UNPROCESSABLE).send({
            message: new Api422Error(error.message),
          });
        }
      });
      Pet.getAllPets()
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((error,res) => {
        if (error.response && error.response.status === 403) {
          res.status(httpStatusCodes.UNPROCESSABLE).send({
            message: new Api422Error(error.message),
          });
        }
      });
      Veterinary.getAllVeterinaries()
      .then((response) => {
        setVeterinary(response.data.veterinary);
      })
      .catch((error,res) => {
        if (error.response && error.response.status === 403) {
          res.status(httpStatusCodes.UNPROCESSABLE).send({
            message: new Api422Error(error.message),
          });
        }
      });
  }, []);

  const data = [
    ['Year', 'Users', 'Products','Events','Pets','Veterinaries'],
    ['2020', 100, 50,25 ,32,45],
    ['2021', 150, 70, 54,54,67],
    ['2022', 200, 90,245,767,534],
    ['2023', 300, 120,435,56,78],
  ];

  return (
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default LineChart;
