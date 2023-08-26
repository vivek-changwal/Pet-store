
const show = async (msg) => {
  const details = {
    id: msg.id,
    sender_id: msg.sender_id,
    receiver_id: msg.receiver_id,
    content: msg.content,
    chat_id: msg.chat_id,
  };
  return details;
};

const index = async (messages) => {
  const messageList = [];
  messages.forEach((msg) => {
    const message = {
      id: msg.id,
      sender: {
        id: msg.sender.id,
        fullname: msg.sender.first_name.concat(` ${msg.sender.last_name}`),
      },
      receiver: {
        id: msg.receiver.id,
        fullname: msg.receiver.first_name.concat(` ${msg.receiver.last_name}`),
      },
      content: msg.content,
      chat_id: msg.chat_id,
    };
    messageList.push(message);
  });
  return messageList;
};


module.exports = {
  show, index,
};

