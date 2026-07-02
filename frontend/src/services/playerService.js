import api from './api'

export const getPlayer = async (id) => {
  const response = await api.get(`/players/${id}`)
  return response.data
}

export const getPlayers = async () => {
  const response = await api.get('/players')
  return response.data
}