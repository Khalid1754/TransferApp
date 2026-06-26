import api from './api'

export const getTransferListings = async () => {
  const response = await api.get('/transferlistings')
  return response.data
}