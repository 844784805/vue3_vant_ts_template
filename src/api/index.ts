import api from '@/api/network'

export const getBannerData = () => api.get('/banner', { type: 2 })
