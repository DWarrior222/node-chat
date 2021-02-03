import axios from 'axios';

const instance = axios.create({
  timeout: 15000,
  withCredentials: true
});

interface query {}

const get = async (url: string, params: query) => {
  return instance.get(`/server/${url}`, { params })
}

export default {
  get
}