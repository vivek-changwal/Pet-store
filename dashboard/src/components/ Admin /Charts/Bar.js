import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import User from "../../authUserLink";
import Product from "../../authProductLink";
import Event from "../../authEventsLink";
import Pet from "../../authPetLink"
import Veterinary from "../../authVeterinary"

const { Api422Error } = require('../../../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../../../utilities/Errors/BaseError');

const BarChart = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [pets, setPets] = useState([]);
  const [veterinaries, setVeterinary] = useState([]);

  const options = {
    title: 'Total Users and Products',
    pieHole: 0.4,
    is3D: false,
  };

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

  const data = [
    ['Category', 'Count', { role: 'style' }],
    ['Users', users.length, '#FF0022'],
    ['Products', products.length, '#FFC0CB'], 
    ['Events', events.length,'#00FF00'],
    ['Pets', pets.length,'#FFA500'],
    ['Veterinaries', veterinaries.length, '#008000'],
  ];
  

  return (
    <div>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarChart;
