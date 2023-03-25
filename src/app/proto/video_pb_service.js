// package: proto
// file: proto/video.proto

var proto_video_pb = require("../proto/video_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var VideoService = (function () {
  function VideoService() {}
  VideoService.serviceName = "proto.VideoService";
  return VideoService;
}());

VideoService.GetVideoChunk = {
  methodName: "GetVideoChunk",
  service: VideoService,
  requestStream: false,
  responseStream: false,
  requestType: proto_video_pb.VideoChunkRequest,
  responseType: proto_video_pb.VideoChunk
};

VideoService.GetVideoMetadata = {
  methodName: "GetVideoMetadata",
  service: VideoService,
  requestStream: false,
  responseStream: false,
  requestType: proto_video_pb.VideoMetadataRequest,
  responseType: proto_video_pb.VideoMetadata
};

VideoService.GetVideoTextTrack = {
  methodName: "GetVideoTextTrack",
  service: VideoService,
  requestStream: false,
  responseStream: false,
  requestType: proto_video_pb.VideoTextTrackRequest,
  responseType: proto_video_pb.VideoTextTrack
};

VideoService.GetVideoAudioTrack = {
  methodName: "GetVideoAudioTrack",
  service: VideoService,
  requestStream: false,
  responseStream: false,
  requestType: proto_video_pb.VideoAudioTrackRequest,
  responseType: proto_video_pb.VideoAudioTrack
};

exports.VideoService = VideoService;

function VideoServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

VideoServiceClient.prototype.getVideoChunk = function getVideoChunk(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VideoService.GetVideoChunk, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

VideoServiceClient.prototype.getVideoMetadata = function getVideoMetadata(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VideoService.GetVideoMetadata, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

VideoServiceClient.prototype.getVideoTextTrack = function getVideoTextTrack(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VideoService.GetVideoTextTrack, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

VideoServiceClient.prototype.getVideoAudioTrack = function getVideoAudioTrack(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VideoService.GetVideoAudioTrack, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.VideoServiceClient = VideoServiceClient;

