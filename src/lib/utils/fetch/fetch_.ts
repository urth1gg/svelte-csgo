import { accessToken } from "$lib/store/accessToken";


function fetch_(url: string, options: any = {}){
    let token = '';

    accessToken.subscribe((val) => {
        token = val;
    })
    
    let baseUrl = 'http://localhost:5173'

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`)
    headers.append('Content-Type', 'application/json')

    return fetch(baseUrl + url, {...options, headers: headers, credentials: 'include'}) 
}


export { fetch_ } 