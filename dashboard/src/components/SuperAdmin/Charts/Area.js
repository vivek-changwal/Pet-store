import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import User from "../../authUserLink";
import Product from "../../authProductLink";
import Event from "../../authEventsLink";
import Pet from "../../authPetLink"
import Veterinary from "../../authVeterinary"

const { Api422Error } = require('../../../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../../../utilities/Errors/BaseError');

const AreaChart = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [pets, setPets] = useState([]);
  const [veterinaries, setVeterinary] = useState([]);

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
    ['2015', 100, 50,21,12,45],
    ['2016', 200, 70,32,56,48],
    ['2017', 300, 90, 21,55,90],
    ['2018', 400, 120, 6,33,45],
    ['2019', 500, 150, 33,5,78],
  ];

  const options = {
    title: 'Users vs Products vs Events vs Pets vs Veterinaries',
    hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 0 },
    seriesType: 'area',
    series: { 1: { curveType: 'function' } },
  };

  return (
    <div>
      <Chart chartType="AreaChart" data={data} options={options} width="100%" height="400px" />
    </div>
  );
};

export default AreaChart;
