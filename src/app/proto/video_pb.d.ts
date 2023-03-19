// package: proto
// file: proto/video.proto

import * as jspb from "google-protobuf";

export class VideoRequest extends jspb.Message {
  getVideoId(): number;
  setVideoId(value: number): void;

  getSeek(): number;
  setSeek(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VideoRequest): VideoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoRequest;
  static deserializeBinaryFromReader(message: VideoRequest, reader: jspb.BinaryReader): VideoRequest;
}

export namespace VideoRequest {
  export type AsObject = {
    videoId: number,
    seek: number,
  }
}

export class VideoResponse extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  hasMetadata(): boolean;
  clearMetadata(): void;
  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  hasStarttime(): boolean;
  clearStarttime(): void;
  getStarttime(): number;
  setStarttime(value: number): void;

  hasEndtime(): boolean;
  clearEndtime(): void;
  getEndtime(): number;
  setEndtime(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VideoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VideoResponse): VideoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VideoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VideoResponse;
  static deserializeBinaryFromReader(message: VideoResponse, reader: jspb.BinaryReader): VideoResponse;
}

export namespace VideoResponse {
  export type AsObject = {
    data: Uint8Array | string,
    metadata: Uint8Array | string,
    starttime: number,
    endtime: number,
  }
}

