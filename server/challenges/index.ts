import config from "../config/server.js";
import path from "path";
import { Challenge, CleanedChallenge } from "./types.js";
import { Provider, ProviderConstructor } from "./Provider.js";
import { challUpdateEmitter, publishChallUpdate } from "../cache/challs.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type EventEmitter } from "events";

let provider: Provider;

let challenges: Challenge[] = [];
let cleanedChallenges: CleanedChallenge[] = [];

let challengesMap = new Map<string, Challenge>();
let cleanedChallengesMap = new Map<string, CleanedChallenge>();

const cleanChallenge = (chall: Challenge): CleanedChallenge => {
  const { files, description, author, points, id, name, category, sortWeight } =
    chall;

  return {
    files,
    description,
    author,
    points,
    id,
    name,
    category,
    sortWeight,
  };
};

const onUpdate = (newChallenges: Challenge[]): void => {
  challenges = newChallenges;
  challengesMap = new Map(newChallenges.map((c) => [c.id, c]));
  cleanedChallenges = challenges.map(cleanChallenge);
  cleanedChallengesMap = new Map(cleanedChallenges.map((c) => [c.id, c]));
};

const providerPath: string = path.join(
  "../providers",
  config.challengeProvider.name,
);

void import(providerPath).then(
  ({ default: Provider }: { default: ProviderConstructor }): void => {
    provider = new Provider(config.challengeProvider.options ?? {});

    provider.on("update", onUpdate);
  },
);

challUpdateEmitter.on("update", () => {
  provider.forceUpdate();
});

export function getAllChallenges(): Challenge[] {
  return challenges;
}

export function getCleanedChallenges(): CleanedChallenge[] {
  return cleanedChallenges;
}

export function getChallenge(id: string): Challenge | undefined {
  return challengesMap.get(id);
}

export function getCleanedChallenge(id: string): CleanedChallenge | undefined {
  return cleanedChallengesMap.get(id);
}

export function resetCache(): void {
  provider.forceUpdate();
}

export async function updateChallenge(chall: Challenge): Promise<void> {
  await provider.updateChallenge(chall);
  await publishChallUpdate();
}

export async function deleteChallenge(id: string): Promise<void> {
  await provider.deleteChallenge(id);
  await publishChallUpdate();
}
