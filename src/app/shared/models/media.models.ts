export enum MediaType {
  TvShow = 'TvShow',
  Movie = 'Movie',
  Episode = 'Episode',
}

export interface Actor {
  id: number;
  name: string;
  overview: string;
  profileUrl: string;
}

export interface Crew {
  id: number;
  name: string;
  profileUrl: string;
  role: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MediaResponse {
  createdAt: string;
  id: number;
  name: string;
  mediaType: MediaType;
  releaseDate: string;
  updatedAt: string;
}

export interface MovieResponse {
  present: boolean;
  actors: Person[];
  backdropUrl: string;
  crew: Crew[];
  genres: Genre[];
  id: number;
  overview: string;
  posterUrl: string;
  releaseDate: string;
  studios: Studio[];
  title: string;
  voteAverage: number;
  voteCount: number;
}

export interface MovieResults {
  results: MovieResponse[];
  totalPage: number;
  totalResult: number;
}

export interface Person {
  character: string;
  id: number;
  name: string;
  profileUrl: string;
}

export interface Studio {
  id: number;
  logoUrl: string;
  name: string;
}

export interface TvEpisodeResponse {
  present: boolean;
  airDate: string;
  episodeNumber: number;
  id: number;
  name: string;
  overview: string;
  posterUrl: string;
  seasonNumber: number;
  tvShowId: number;
}

export interface TvShowResponse {
  present: boolean;
  actors: Person[];
  backdropUrl: string;
  crew: Crew[];
  genres: Genre[];
  id: number;
  networks: Studio[];
  nextEpisode?: TvEpisodeResponse;
  overview: string;
  posterUrl: string;
  releaseDate: string;
  seasonsCount: number;
  episodesCount: number;
  status: string;
  title: string;
  voteAverage: number;
  voteCount: number;
}

export interface TvShowResults {
  results: TvShowResponse[];
  totalPage: number;
  totalResult: number;
}

export interface ActorsResults {
  results: Actor[];
  totalPage: number;
  totalResult: number;
}

export interface MediaSearchStateModel {
  query: string;
  movies: MovieResults;
  tvShows: TvShowResults;
  moviesCurrentPage: number;
  tvShowsCurrentPage: number;
  moviesError: string;
  tvShowsError: string;
  moviesLoading: boolean;
  tvShowsLoading: boolean;
  hasMoviesError: boolean;
  hasTvShowsError: boolean;
}
