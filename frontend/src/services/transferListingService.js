import api from './api'

export const getTransferListings = async () => {
  const response = await api.get('/transferlistings')
  return response.data
}

export const getMyClubListings = async () => {
  const response = await api.get('/transferlistings/myclub')
  return response.data
}