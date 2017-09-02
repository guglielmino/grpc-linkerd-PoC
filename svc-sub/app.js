import grpc from 'grpc';

const PROTO_FILE_PATH = (process.env.PROTOS_PATH || __dirname + '/../protos/') + 'svc-sub.proto';

console.log(`Getting proto from ${PROTO_FILE_PATH}`);

/// DEBUG
const fs = require('fs');

console.log('LIST ... ');
fs.readdir('/protos/', (err, files) => {
    files.forEach(file => {
        console.log('PROTO=> ' + file);
    });
});
/// DEBUG

const SubService = grpc.load(PROTO_FILE_PATH).SubService;

/**
 * Implements the sub RPC method.
 */
function sub(call, callback) {
    console.log(JSON.stringify(call));
    callback(null, { result: call.request.a - call.request.b });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    server.addService(SubService.service, {sub: sub});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();

