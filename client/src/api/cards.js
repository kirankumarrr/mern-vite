import axios from "axios";

const getCards = () => {
  return axios.get(`api/reminders/cards`);
};

const postCards = () => {
  return axios.post(`api/reminders/cards`, newdata);
};

const updateCards = (payload) => {
  return axios.put(`api/reminders/cards/${payload._id}`, payload);
};
export default {
  getCards,
  postCards,
  updateCards,
};
