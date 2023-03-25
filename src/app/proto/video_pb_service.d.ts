// package: proto
// file: proto/video.proto

import * as proto_video_pb from "../proto/video_pb";
import {grpc} from "@improbable-eng/grpc-web";

type VideoServiceGetVideoChunk = {
  readonly methodName: string;
  readonly service: typeof VideoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_video_pb.VideoChunkRequest;
  readonly responseType: typeof proto_video_pb.VideoChunk;
};

type VideoServiceGetVideoMetadata = {
  readonly methodName: string;
  readonly service: typeof VideoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_video_pb.VideoMetadataRequest;
  readonly responseType: typeof proto_video_pb.VideoMetadata;
};

type VideoServiceGetVideoTextTrack = {
  readonly methodName: string;
  readonly service: typeof VideoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_video_pb.VideoTextTrackRequest;
  readonly responseType: typeof proto_video_pb.VideoTextTrack;
};

type VideoServiceGetVideoAudioTrack = {
  readonly methodName: string;
  readonly service: typeof VideoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_video_pb.VideoAudioTrackRequest;
  readonly responseType: typeof proto_video_pb.VideoAudioTrack;
};

export class VideoService {
  static readonly serviceName: string;
  static readonly GetVideoChunk: VideoServiceGetVideoChunk;
  static readonly GetVideoMetadata: VideoServiceGetVideoMetadata;
  static readonly GetVideoTextTrack: VideoServiceGetVideoTextTrack;
  static readonly GetVideoAudioTrack: VideoServiceGetVideoAudioTrack;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class VideoServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getVideoChunk(
    requestMessage: proto_video_pb.VideoChunkRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_video_pb.VideoChunk|null) => void
  ): UnaryResponse;
  getVideoChunk(
    requestMessage: proto_video_pb.VideoChunkRequest,
    callback: (error: ServiceError|null, responseMessage: proto_video_pb.VideoChunk|null) => void
  ): UnaryResponse;
  getVideoMetadata(
    requestMessage: proto_video_pb.VideoMetadataRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_video_pb.VideoMetadata|null) => void
  ): UnaryResponse;
  getVideoMetadata(
    requestMessage: proto_video_pb.VideoMetadataRequest,
    callback: (error: ServiceError|null, responseMessage: proto_video_pb.VideoMetadata|null) => void
  ): UnaryResponse;
  getVideoTextTrack(
    requestMessage: proto_video_pb.VideoTextTrackRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_video_pb.VideoTextTrack|null) => void
  ): UnaryResponse;
  getVideoTextTrack(
    requestMessage: proto_video_pb.VideoTextTrackRequest,
    callback: (error: ServiceError|null, responseMessage: proto_video_pb.VideoTextTrack|null) => void
  ): UnaryResponse;
  getVideoAudioTrack(
    requestMessage: proto_video_pb.VideoAudioTrackRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_video_pb.VideoAudioTrack|null) => void
  ): UnaryResponse;
  getVideoAudioTrack(
    requestMessage: proto_video_pb.VideoAudioTrackRequest,
    callback: (error: ServiceError|null, responseMessage: proto_video_pb.VideoAudioTrack|null) => void
  ): UnaryResponse;
}

