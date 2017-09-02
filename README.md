# Microservices with gRPC and Linkerd

A simple PoC to try a microservices architecture using [gRPC](https://grpc.io/) as communication layer and 
[Linkerd](https://linkerd.io/) as communication manager.

The PoC is quite simple, it is made of two "dummy" services, svc-sum and svc-sub, and you can guess what they do :-)
On the other side there is a consumer to use both services. This project can run in the host machine but it's intended 
to be used with docker. 

