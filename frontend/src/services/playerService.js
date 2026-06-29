import api from './api'

export const getPlayer = async (id) => {
  const response = await api.get(`/players/${id}`)
  return response.data
}