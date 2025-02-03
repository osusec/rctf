import { responses } from '../../../responses.js'
import * as challenges from '../../../challenges'
import perms from '../../../util/perms.js'

export default {
  method: 'GET',
  path: '/admin/challs/:id',
  requireAuth: true,
  perms: perms.challsRead,
  schema: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        }
      },
      required: ['id']
    }
  },
  handler: async ({ req }) => {
    const chall = challenges.getChallenge(req.params.id)

    if (!chall) {
      return responses.badChallenge
    }

    return [responses.goodChallenges, chall]
  }
}
