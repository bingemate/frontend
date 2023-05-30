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
