const messages = require("../proto/grpc_pb");
var openApiConverter = require("openapi-to-postmanv2");
var Swagger2OpenAPI = require("swagger2openapi");
const helpers = require("swagger2-to-postmanv2/lib/helpers");

module.exports = class BPPostman {
  constructor(grpc) {
    this.grpc = grpc;
  }

  convertFile = (call, callback) => {
    var outputFile;
    let resp = new messages.PostmanServiceResponse();
    var tempConv = converter(call.request.getInputfile());
    // var outputFile = openApiScript(tempConv)
    // var outputFile = swaggerScript(tempConv)
    console.log(tester(tempConv));
    // if (outputFile === null) {
    //       outputFile = swaggerScript(tempConv,{}, function(err, result){})
    // }
    //     console.log(outputFile);
    var stringFile;

    try {
      stringFile = JSON.stringify(outputFile.output[0].data);
      var fileToByte = stringToByteArray(stringFile);
      resp.setOutputfile(fileToByte);
      callback(null, resp);
    } catch (err) {
      return callback({
        code: this.grpc.status.UNKNOWN,
        message: err,
      });
    }
  };
};

function stringToByteArray(s) {
  // Otherwise, fall back to 7-bit ASCII only
  var result = new Uint8Array(s.length);
  for (var i = 0; i < s.length; i++) {
    result[i] = s.charCodeAt(i); /* w ww. ja  v  a 2s . co  m*/
  }
  return result;
}

function converter(uint8array) {
  return new TextDecoder().decode(uint8array);
}

function openApiScript(fsInput) {
  var res = openApiConverter.convert(
    { type: "string", data: fsInput },
    {},
    (err, conversionResult) => {
      if (!conversionResult.result) {
        console.log("Could not convert", conversionResult.reason);
        return err, null;
      } else {
        console.log(conversionResult.output[0].data);
        return null, conversionResult;
      }
    }
  );

  return res;
}

function tester(tempConv) {
  swaggerScript(tempConv, {}, (err, result) => {
    return result;
  });
}

async function swaggerScript(input, options, callback) {
  var parseResult = helpers.parse(input);

  if (!parseResult.result) {
    return callback(new Error(parseResult.reason || "Invalid input"));
  }
  try {
    Swagger2OpenAPI.convertObj(
      parseResult.swagger,
      {
        fatal: false,
        patch: true,
        anchors: true,
        warnOnly: true,
      },
      function (err, oas3Wrapper) {
        if (err) {
          return callback(err);
        }

        return openApiConverter.convert(
          {
            type: "json",
            data: oas3Wrapper.openapi,
          },
          options,
          (error, result) => {
            if (error) {
              return callback("Error importing Swagger 2.0 spec");
            }

            // console.log(result);
            return callback(null, result);
          }
        );
      }
    );
  } catch (e) {
    return callback(e);
  }
  //     try {
  //       return Swagger2OpenAPI.convertObj(parseResult.swagger, {}, function(err, oas3Wrapper) {
  //         if (err) {
  //       //     return callback(err);
  //         }

  //   return openApiConverter.convert({
  //     type: 'json',
  //     data: oas3Wrapper.openapi
  //   }, options, (error, result) => {
  //     if (error) {
  //       // return callback('Error importing Swagger 2.0 spec');
  //       return error
  //     }

  // //     return callback(null, result);
  // return result
  //   });
  //       });
  //     }
  //     catch (e) {
  //       return e;
  //     }

  // var res = swaggerConverter.convert({ type: 'string', data: fsInput },
  //       {}, function(err, conversionResult) {
  //             if (!conversionResult.result) {
  //                   console.log('Could not convert', conversionResult.reason);
  //             }else{
  //                   console.log(conversionResult.output[0].data)
  //                   return null,conversionResult
  //             }

  //       }
  // );

  // console.log(res)

  // return res
}
