import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import User from "../../authUserLink";
import Product from "../../authProductLink";
import Event from "../../authEventsLink";
import Pet from "../../authPetLink"

const { Api422Error } = require('../../../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../../../utilities/Errors/BaseError');

const GaugeChart = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [pets, setPets] = useState([]);

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
  }, []);

  const data = [
    ['Label', 'Value'],
    ['Users', users.length],
    ['Products', products.length],
    ['Events', events.length],
    ['Pets', pets.length],    
  ];

  const options = {
    width: 400,
    height: 120,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
  };

  return (
    <div>
      <Chart chartType="Gauge" data={data} options={options} />
    </div>
  );
};

export default GaugeChart;
