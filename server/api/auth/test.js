import { responses } from '../../responses.js'

export default {
  method: 'GET',
  path: '/auth/test',
  requireAuth: true,
  handler: async () => {
    return responses.goodToken
  }
}
