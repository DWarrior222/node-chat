import { Interface } from 'readline';
import http from '../http/index';

interface loginface {
  user: string
}
const login = async (params: loginface) => {
  try {
    await http.get('signin', params)
    return true
  } catch (err) {
    return false
  }
}

export default {
  login
}