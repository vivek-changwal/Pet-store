const show = async (chat) => {
  const details = {
    id: chat.id,
    sender_id: chat.sender_id,
    receiver_id: chat.receiver_id,
  };
  return details;
};

module.exports = {
  show,
};

