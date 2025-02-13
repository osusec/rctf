import * as database from '../../../database'
import { responses } from '../../../responses.js'
import config from '../../../config/server.js'

export default {
  method: 'GET',
  path: '/users/me/members',
  requireAuth: true,
  handler: async ({ user }) => {
    if (!config.userMembers) {
      return responses.badEndpoint
    }

    const members = await database.members.getMembers({
      userid: user.id
    })

    return [responses.goodMemberData, members]
  }
}
