require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const services = require('./proto/grpc_grpc_pb');
const BPPostman = require("./src/postman")


async function initGRPC() {
    try {
        bpPostman = new BPPostman(grpc);
    } catch (e) {
        console.error(e);
    }
}


async function main() {
    await initGRPC().catch(console.dir);
    let server = new grpc.Server();
    server.addService(services.PostmanService, {
          convertFile: bpPostman.convertFile,
    });
    let address = process.env.HOST + ":" + process.env.PORT;
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log("Server running at " + address);
    });
}

main();
            var fs = require('fs')

            openapiData = fs.readFileSync('collection.json', {encoding: 'UTF8'});