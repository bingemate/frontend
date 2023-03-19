// package: proto
// file: proto/video.proto

import * as proto_video_pb from "../proto/video_pb";
import {grpc} from "@improbable-eng/grpc-web";

type VideoServiceGetVideoStream = {
  readonly methodName: string;
  readonly service: typeof VideoService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof proto_video_pb.VideoRequest;
  readonly responseType: typeof proto_video_pb.VideoResponse;
};

export class VideoService {
  static readonly serviceName: string;
  static readonly GetVideoStream: VideoServiceGetVideoStream;
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
  getVideoStream(requestMessage: proto_video_pb.VideoRequest, metadata?: grpc.Metadata): ResponseStream<proto_video_pb.VideoResponse>;
}

