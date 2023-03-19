// package: proto
// file: proto/video.proto

var proto_video_pb = require("../proto/video_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var VideoService = (function () {
  function VideoService() {}
  VideoService.serviceName = "proto.VideoService";
  return VideoService;
}());

VideoService.GetVideoStream = {
  methodName: "GetVideoStream",
  service: VideoService,
  requestStream: false,
  responseStream: true,
  requestType: proto_video_pb.VideoRequest,
  responseType: proto_video_pb.VideoResponse
};

exports.VideoService = VideoService;

function VideoServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

VideoServiceClient.prototype.getVideoStream = function getVideoStream(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(VideoService.GetVideoStream, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.VideoServiceClient = VideoServiceClient;

