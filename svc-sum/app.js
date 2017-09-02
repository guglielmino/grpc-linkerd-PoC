import grpc from 'grpc';

const PROTO_FILE_PATH = (process.env.PROTOS_PATH || __dirname + '/../protos/') + 'svc-sum.proto';

console.log(`Getting proto from ${PROTO_FILE_PATH}`);


const SumService = grpc.load(PROTO_FILE_PATH).SumService;

/**
 * Implements the sum RPC method.
 */
function sum(call, callback) {
    callback(null, { result: call.request.a + call.request.b });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    server.addService(SumService.service, {sum: sum});
    server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();

