import config from '../../config/server.js'
import * as challenges from '../../challenges'
import { responses } from '../../responses.js'
import { getChallengeInfo } from '../../cache/leaderboard.js'

export default {
  method: 'GET',
  path: '/challs',
  requireAuth: true,
  handler: async () => {
    if (Date.now() < config.startTime) {
      return responses.badNotStarted
    }

    const cleaned = challenges.getCleanedChallenges()
    const challengeInfo = await getChallengeInfo({
      ids: cleaned.map(chall => chall.id)
    })

    return [responses.goodChallenges, cleaned.map((chall, i) => ({
      ...chall,
      points: challengeInfo[i].score,
      solves: challengeInfo[i].solves
    }))]
  }
}
