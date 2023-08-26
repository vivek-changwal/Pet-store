import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import User from "../../authUserLink";
import Product from "../../authProductLink";
import Event from "../../authEventsLink";
import Pet from "../../authPetLink"
import Veterinary from "../../authVeterinary"

const { Api422Error } = require('../../../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../../../utilities/Errors/BaseError');

const AnimatedChart = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [pets, setPets] = useState([]);
  const [veterinaries, setVeterinary] = useState([]);

  useEffect(() => {
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

  const chartData = [
    ['Category', 'Count', { role: 'style' }],
    ['Users', users.length, '#FF0022'],
    ['Products', products.length, '#00GG00'],
    ['Events', events.length,'#11GG00'],
    ['Pets', pets.length,'#55BB00'],
    ['Veterinaries', veterinaries.length,'#44AA00'],
  ];

  const options = {
    title: 'Total Users and Products',
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true,
    },
  };

  return (
    <div>
      <Chart
        chartType="Bar"
        data={chartData}
        options={options}
        width="100%"
        height="400px"
      />
    </div>
  );
};

export default AnimatedChart;
