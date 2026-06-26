import api from './api'

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const register = async (email, password, clubId, role) => {
  const response = await api.post('/auth/register', {
    email,
    password,
    clubId,
    role,
  })
  return response.data
}