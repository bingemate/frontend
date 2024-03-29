export interface CommentRequest {
  content: string;
}

export interface CommentResponse {
  content: string;
  createdAt: string;
  id: number;
  mediaId: number;
  updatedAt: string;
  userId: string;
}

export interface CommentResults {
  results: CommentResponse[];
  totalResult: number;
}

export interface CommentHistory {
  date: string;
  count: number;
}

export const emptyCommentResults: CommentResults = {
  results: [],
  totalResult: 0,
};

export interface commentHistoryResponse {
  date: string;
  count: number;
}
