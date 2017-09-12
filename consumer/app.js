import grpc from 'grpc';

const PROTOS_BASE_PATH = (process.env.PROTOS_PATH || __dirname + '/../protos/');

const SUB_PATH = `${PROTOS_BASE_PATH}svc-sub.proto`;
const SUM_PATH = `${PROTOS_BASE_PATH}svc-sum.proto`;

console.log(`Getting protos from ${SUB_PATH} and ${SUM_PATH}`);
const SubService = grpc.load(SUB_PATH).SubService;
const SumService = grpc.load(SUM_PATH).SumService;


function main() {
    const credentials = grpc.credentials.createInsecure();
    const subClient = new SubService(process.env.SUB_SVC_HOST || 'localhost:50051', credentials);

    const sumClient = new SumService(process.env.SUM_SVC_HOST || 'localhost:50052', credentials);

    setInterval(() => {
        console.log("Calling...");
        subClient.sub({a: 10, b: 3}, function (err, response) {
            if (err) {
                console.log(`error ${err}`);
            } else {
                console.log('subClient:', JSON.stringify(response));
            }
        });


        sumClient.sum({a: 10, b: 3}, function (err, response) {
            if (err) {
                console.log(`error ${err}`);
            } else {
                console.log('sumClient:', JSON.stringify(response));
            }
        });
    }, 1000);
}

main();