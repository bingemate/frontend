export interface RatingResponse {
  userId: string;
  mediaId: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface RatingResults {
  results: RatingResponse[];
  totalResult: number;
}

export interface RatingRequest {
  rating: number;
}

export const emptyRatingResults: RatingResults = {
  results: [],
  totalResult: 0,
};
