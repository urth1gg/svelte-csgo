class Aws{
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
}

let aws = new Aws();

export { aws }