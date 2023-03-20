import { S3 } from '@aws-sdk/client-s3';

class Aws{
    s3: any;

    constructor(){}

    async startInstance(token: string){
        let request = await fetch('https://valhallla-ops.tk:5000/api/server-instance/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        let response = await request.json();

        return response;
    }

    async terminateInstance(ip: string){
        let request = await fetch('https://valhallla-ops.tk:5000/api/server-instance/terminate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ip: ip
            })
        })

        let response = await request.json();

        return response;
    }

    getS3(){
        if(this.s3) return this.s3;

        return this.s3 = new S3({
            region: 'eu-central-1',
            credentials: {
                accessKeyId: "AKIAXRVX4XCMMI3NR5EZ",
                secretAccessKey: "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"
            }
        })
    }
}

let aws = new Aws();

export { aws }