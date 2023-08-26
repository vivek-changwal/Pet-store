import React, { useEffect, useState } from 'react';
import {
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import User from '../../authUserLink';
import Product from '../../authProductLink';
import Header from '../../Header';
import Pie from '../Charts/Pie';
import Bar from '../Charts/Bar'
import Line from '../Charts/Line'
import Radar from '../Charts/Radar'
import AreaChart from '../Charts/Area'
import Animation from '../Charts/Animation'
import { tokens } from "../../../theme";


const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    User.getAllUser()
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
        }
      });
  }, []);

  useEffect(() => {
    Product.getAllProducts()
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
        }
      });
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="140px"
        gap="12px"
        sx={{
          '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' },
        }}
      >
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <AreaChart/>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Line/>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Pie />
        </Box>
      
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Bar />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Radar />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Animation />
        </Box>
      </Box>
    </Box>
    
  );
};

export default Dashboard;


