const show = async (ord) => {
  const responseData = {
    id: ord.id,
    total_amount: ord.total_amount,
    status: ord.status,
    user: {
      fullname: ord.user.first_name.concat(`${ord.user.last_name}`),
    },
  };
  return responseData;
};

const index = async (orders) => {
  const orderList = [];
  orders.forEach((ord) => {
    const user = {
      id: ord.id,
      total_amount: ord.total_amount,
      status: ord.status,
      user: {
        fullname: ord.user.first_name.concat(`${ord.user.last_name}`),
        email: ord.user.email,
        phone: ord.user.phone,
      },
    };
    orderList.push(user);
  });
  return orderList;
};


module.exports = {
  show, index,
};

