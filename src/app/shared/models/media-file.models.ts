/*{
    "results": [
        {
            "id": 3416111,
            "name": "Arifureta 2x02",
            "releaseDate": "2022-01-20",
            "episodeNumber": 2,
            "seasonNumber": 2,
            "tvShowId": 86034,
            "tvShowName": "Arifureta",
            "file": {
                "id": "1df7a3a7-9301-4a6e-94d3-2cc1bf690c2d",
                "createdAt": "2023-06-12T15:30:56.01346+02:00",
                "updatedAt": "2023-06-12T15:30:56.01346+02:00",
                "size": 468553800,
                "filename": "index.m3u8",
                "duration": 1428.094,
                "audios": [
                    {
                        "language": "jpn",
                        "filename": "audio_1.m3u8"
                    }
                ],
                "subtitles": [
                    {
                        "language": "fre",
                        "filename": "subtitle_2.vtt"
                    }
                ]
            }
        }
    ],
    "total": 4
}*/

export interface AudioTrack {
  filename: string;
  language: string;
}

export interface SubtitleTrack {
  filename: string;
  language: string;
}

export interface MediaFile {
  id: string;
  filename: string;
  duration: number;
  size: number;
  createdAt: string;
  updatedAt: string;
  audios: AudioTrack[];
  subtitles: SubtitleTrack[];
}

export interface MovieFileResponse {
  id: number;
  name: string;
  releaseDate: string;
  file: MediaFile;
}

export interface MovieFileResults {
  results: MovieFileResponse[];
  total: number;
}

export interface EpisodeFileResponse {
  id: number;
  name: string;
  releaseDate: string;
  episodeNumber: number;
  seasonNumber: number;
  tvShowId: number;
  tvShowName: string;
  file: MediaFile;
}

export interface EpisodeFileResults {
  results: EpisodeFileResponse[];
  total: number;
}
