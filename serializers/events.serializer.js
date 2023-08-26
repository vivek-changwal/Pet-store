const show = async (event) => {
  const responseData = {
    id: event.id,
    user_id: event.user_id,
    name: event.name,
    date: event.date,
    location: event.location,
    time: event.time,
    contact: event.contact,
    image: event.image,
    organised_by: event.organised_by,
    user: {
      fullname: event.user.first_name.concat(`${event.user.last_name}`),
      email: event.user.email,
      phone: event.user.phone,
    },
  };
  return responseData;
};

const index = async (events) => {
  const eventsList = [];
  Array.from(events.rows).forEach((event) => {
    const user = {
      id: event.id,
      name: event.name,
      date: event.date,
      location: event.location,
      time: event.time,
      contact: event.contact,
      image: event.image,
      organised_by: event.organised_by,
      user: {
        first_name: event.user.first_name,
        last_name: event.user.last_name,
      },
    };
    eventsList.push(user);
  });
  return eventsList;
};


module.exports = {
  show, index,
};

