// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var grpc_pb = require('./grpc_pb.js');

function serialize_PostmanServiceRequest(arg) {
  if (!(arg instanceof grpc_pb.PostmanServiceRequest)) {
    throw new Error('Expected argument of type PostmanServiceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PostmanServiceRequest(buffer_arg) {
  return grpc_pb.PostmanServiceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_PostmanServiceResponse(arg) {
  if (!(arg instanceof grpc_pb.PostmanServiceResponse)) {
    throw new Error('Expected argument of type PostmanServiceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_PostmanServiceResponse(buffer_arg) {
  return grpc_pb.PostmanServiceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PostmanService = exports.PostmanService = {
  convertFile: {
    path: '/Postman/convertFile',
    requestStream: false,
    responseStream: false,
    requestType: grpc_pb.PostmanServiceRequest,
    responseType: grpc_pb.PostmanServiceResponse,
    requestSerialize: serialize_PostmanServiceRequest,
    requestDeserialize: deserialize_PostmanServiceRequest,
    responseSerialize: serialize_PostmanServiceResponse,
    responseDeserialize: deserialize_PostmanServiceResponse,
  },
};

exports.PostmanClient = grpc.makeGenericClientConstructor(PostmanService);
