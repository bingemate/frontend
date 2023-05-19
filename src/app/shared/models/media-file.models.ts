export interface AudioResponse {
  bitrate: number;
  codec: string;
  language: string;
}

export interface SubtitleResponse {
  code: string;
  language: string;
}

export interface MediaFileResponse {
  audios: AudioResponse[];
  codec: string;
  createdAt: string;
  duration: number;
  filename: string;
  id: string;
  mimeType: string;
  size: number;
  subtitles?: SubtitleResponse[];
  updatedAt: string;
}
