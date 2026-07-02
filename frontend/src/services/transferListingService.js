import api from './api'

export const getTransferListings = async () => {
  const response = await api.get('/transferlistings')
  return response.data
}

export const getMyClubListings = async () => {
  const response = await api.get('/transferlistings/myclub')
  return response.data
}

export const createListing = async (playerId, askingPrice, expiresAt) => {
  const response = await api.post('/transferlistings', {
    playerId,
    askingPrice,
    expiresAt: expiresAt || null,
  })
  return response.data
}