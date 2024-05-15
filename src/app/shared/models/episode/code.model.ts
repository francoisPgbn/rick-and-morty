export interface Code {
  season: number;
  episode: number;
}

export const GetCode = (value: `S${number}E${number}`) => {
  return {
    season: value.slice(1, 3) as unknown as number,
    episode: value.slice(-2) as unknown as number,
  } satisfies Code;
};

export const GetEpisodeFromCode = (value: Code) =>
  `S${value.season}E${value.episode}`;
