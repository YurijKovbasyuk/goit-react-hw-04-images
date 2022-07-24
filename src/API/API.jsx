import axios from 'axios';

const API_KEY = '27625632-25685d1490259d6854a924975';
axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
  orientation: 'horizontal',
};

export const getImages = async (query, page, per_page) => {
  const { data } = await axios.get(
    `?key=${API_KEY}&q=${query}&page=${page}&per_page=${per_page}`
  );

  return data;
};
