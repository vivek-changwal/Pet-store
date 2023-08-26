const show = async (feedback) => {
  const feedbackDetails = {
    id: feedback.id,
    product_id: feedback.product_id,
    feedback: feedback.feedback,
    user_id: feedback.user_id,
  };
  return feedbackDetails;
};


const index = async (feedbacks) => {
  const feedbackList = [];
  feedbacks.forEach((feedback) => {
    const user = {
      id: feedback.id,
      product_id: feedback.product_id,
      feedback: feedback.feedback,
      user: {
        fullname: feedback.user.first_name.concat(`${feedback.user.last_name}`),
        email: feedback.user.email,
      },
    };
    feedbackList.push(user);
  });
  return feedbackList;
};

module.exports = {
  show, index,
};

