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

const getUserInfo = async () => {
  try {
    const { data } = await http.get('userinfo', {})
    return data
  } catch (err) {
    return false
  }
}

const signout = async () => {
  try {
    await http.get('signout', {})
    return true
  } catch (err) {
    return false
  }
}

export default {
  login,
  getUserInfo,
  signout
}