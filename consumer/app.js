import grpc from 'grpc';

const PROTOS_BASE_PATH = (process.env.PROTOS_PATH || __dirname + '/../protos/');

const SUB_PATH = `${PROTOS_BASE_PATH}svc-sub.proto`;
const SUM_PATH =`${PROTOS_BASE_PATH}svc-sum.proto`;

console.log(`Getting protos from ${SUB_PATH} and ${SUM_PATH}`);
const SubService = grpc.load(SUB_PATH).SubService;
const SumService = grpc.load(SUM_PATH).SumService;


function main() {
    const credentials = grpc.credentials.createInsecure();
    const subClient = new SubService('localhost:50051', credentials);

    const sumClient = new SumService('localhost:50052', credentials);

    subClient.sub({a: 10, b: 3}, function(err, response) {
        if(err) {
            console.log(`error ${err}`);
        } else {
            console.log('subClient:', JSON.stringify(response));
        }
    });

    sumClient.sum({a: 10, b: 3}, function(err, response) {
        if(err) {
            console.log(`error ${err}`);
        } else {
            console.log('sumClient:', JSON.stringify(response));
        }
    });
}

main();