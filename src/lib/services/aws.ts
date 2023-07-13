import { S3 } from '@aws-sdk/client-s3';

class Aws{
    s3: any;

    constructor(){}

    async startInstance(token: string){
        let request = await fetch('https://dustydreams.gg:3001/api/server-instance/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        let response = await request.json();

        return response;
    }

    async terminateInstance(token: string, ip: string){
        let request = await fetch('https://dustydreams.gg:3001/api/server-instance/terminate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                ip: ip
            })
        })

        let response = await request.json();

        return response;
    }

    async setConfiguration(token:string, ip: string, config: InstanceConfiguration){
        let request = await fetch('https://dustydreams.gg:3001/api/server-instance/set-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                config: config,
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