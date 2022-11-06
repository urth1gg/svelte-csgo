import { createClient } from 'redis';

const client = createClient({
    socket:{
        host: 'redis-17654.c135.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 17654
    },
    password: 'l9Ei5LVjgIRN5VraLk71GzQNSw0FPHb3'
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect()

export { client }