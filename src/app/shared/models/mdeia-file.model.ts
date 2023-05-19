export interface AudioTrack {
  filename: string;
  language: string;
}

export interface SubtitleTrack {
  filename: string;
  language: string;
}

export interface MediaFile {
  filename: string;
  duration: number;
  audioTracks: AudioTrack[];
  subtitleTracks: SubtitleTrack[];
}
