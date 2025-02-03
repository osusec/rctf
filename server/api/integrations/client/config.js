import clientConfig from '../../../config/client.js'
import { responses } from '../../../responses.js'

export default {
  method: 'GET',
  path: '/integrations/client/config',
  requireAuth: false,
  handler: async () => {
    return [responses.goodClientConfig, clientConfig]
  }
}
