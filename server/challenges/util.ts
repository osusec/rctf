import { Challenge } from './types.js'
import { deepCopy } from '../util/index.js'

const ChallengeDefaults: Challenge = {
  id: '',
  name: '',
  description: '',
  category: '',
  author: '',
  files: [],
  tiebreakEligible: true,
  points: {
    min: 0,
    max: 0
  },
  flag: ''
}

export const applyChallengeDefaults = (chall: Challenge): Challenge => {
   
  const copy = deepCopy(ChallengeDefaults)
   
  return {
    ...copy,
    ...chall
  }
}
