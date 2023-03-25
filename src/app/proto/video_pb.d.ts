// package: proto
// file: proto/video.proto

import * as jspb from "google-protobuf";

export class VideoChunkRequest extends jspb.Message {
  getVideoId(): number;
  setVideoId(value: number): void;

  getSeek(): number;
  setSeek(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoChunkRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VideoChunkRequest): VideoChunkRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoChunkRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoChunkRequest;
  static deserializeBinaryFromReader(message: VideoChunkRequest, reader: jspb.BinaryReader): VideoChunkRequest;
}

export namespace VideoChunkRequest {
  export type AsObject = {
    videoId: number,
    seek: number,
  }
}

export class VideoMetadataRequest extends jspb.Message {
  getVideoId(): number;
  setVideoId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoMetadataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VideoMetadataRequest): VideoMetadataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoMetadataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoMetadataRequest;
  static deserializeBinaryFromReader(message: VideoMetadataRequest, reader: jspb.BinaryReader): VideoMetadataRequest;
}

export namespace VideoMetadataRequest {
  export type AsObject = {
    videoId: number,
  }
}

export class VideoMetadata extends jspb.Message {
  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  getVideoDuration(): number;
  setVideoDuration(value: number): void;

  clearTextTrackLanguagesList(): void;
  getTextTrackLanguagesList(): Array<string>;
  setTextTrackLanguagesList(value: Array<string>): void;
  addTextTrackLanguages(value: string, index?: number): string;

  clearAudioTrackLanguagesList(): void;
  getAudioTrackLanguagesList(): Array<string>;
  setAudioTrackLanguagesList(value: Array<string>): void;
  addAudioTrackLanguages(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoMetadata.AsObject;
  static toObject(includeInstance: boolean, msg: VideoMetadata): VideoMetadata.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoMetadata, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoMetadata;
  static deserializeBinaryFromReader(message: VideoMetadata, reader: jspb.BinaryReader): VideoMetadata;
}

export namespace VideoMetadata {
  export type AsObject = {
    metadata: Uint8Array | string,
    videoDuration: number,
    textTrackLanguagesList: Array<string>,
    audioTrackLanguagesList: Array<string>,
  }
}

export class VideoTextTrackRequest extends jspb.Message {
  getLanguage(): string;
  setLanguage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoTextTrackRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VideoTextTrackRequest): VideoTextTrackRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoTextTrackRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoTextTrackRequest;
  static deserializeBinaryFromReader(message: VideoTextTrackRequest, reader: jspb.BinaryReader): VideoTextTrackRequest;
}

export namespace VideoTextTrackRequest {
  export type AsObject = {
    language: string,
  }
}

export class VideoTextTrack extends jspb.Message {
  getTextTrack(): Uint8Array | string;
  getTextTrack_asU8(): Uint8Array;
  getTextTrack_asB64(): string;
  setTextTrack(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoTextTrack.AsObject;
  static toObject(includeInstance: boolean, msg: VideoTextTrack): VideoTextTrack.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoTextTrack, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoTextTrack;
  static deserializeBinaryFromReader(message: VideoTextTrack, reader: jspb.BinaryReader): VideoTextTrack;
}

export namespace VideoTextTrack {
  export type AsObject = {
    textTrack: Uint8Array | string,
  }
}

export class VideoAudioTrackRequest extends jspb.Message {
  getLanguage(): string;
  setLanguage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoAudioTrackRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VideoAudioTrackRequest): VideoAudioTrackRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoAudioTrackRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoAudioTrackRequest;
  static deserializeBinaryFromReader(message: VideoAudioTrackRequest, reader: jspb.BinaryReader): VideoAudioTrackRequest;
}

export namespace VideoAudioTrackRequest {
  export type AsObject = {
    language: string,
  }
}

export class VideoAudioTrack extends jspb.Message {
  getAudioTrack(): Uint8Array | string;
  getAudioTrack_asU8(): Uint8Array;
  getAudioTrack_asB64(): string;
  setAudioTrack(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoAudioTrack.AsObject;
  static toObject(includeInstance: boolean, msg: VideoAudioTrack): VideoAudioTrack.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoAudioTrack, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoAudioTrack;
  static deserializeBinaryFromReader(message: VideoAudioTrack, reader: jspb.BinaryReader): VideoAudioTrack;
}

export namespace VideoAudioTrack {
  export type AsObject = {
    audioTrack: Uint8Array | string,
  }
}

export class VideoChunk extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  getStartTime(): number;
  setStartTime(value: number): void;

  getEndTime(): number;
  setEndTime(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoChunk.AsObject;
  static toObject(includeInstance: boolean, msg: VideoChunk): VideoChunk.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoChunk, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoChunk;
  static deserializeBinaryFromReader(message: VideoChunk, reader: jspb.BinaryReader): VideoChunk;
}

export namespace VideoChunk {
  export type AsObject = {
    data: Uint8Array | string,
    startTime: number,
    endTime: number,
  }
}

