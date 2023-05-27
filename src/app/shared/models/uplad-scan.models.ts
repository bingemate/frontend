export interface MovieScanResponse {
  data: MovieScannerResult[];
}

export interface TVScanResponse {
  data: TVScannerResult[];
}

export interface UploadResponse {
  count: number;
  message: string;
}

export interface MovieScannerResult {
  movie: Movie;
  source: string;
}

export interface TVScannerResult {
  source: string;
  tvepisode: TVEpisode;
}

export interface Category {
  id: number;
  name: string;
}

export interface Movie {
  categories: Category[];
  id: number;
  name: string;
  releaseDate: string;
}

export interface TVEpisode {
  categories: Category[];
  episode: number;
  id: number;
  name: string;
  releaseDate: string;
  season: number;
  tvReleaseDate: string;
  tvShowID: number;
}
