import { accessToken } from "$lib/store/accessToken";
import { PUBLIC_BASE_URL } from "$env/static/public";

function fetch_(url: string, options: any = {}){
    let token = '';

    accessToken.subscribe((val) => {
        token = val;
    })
    
    let baseUrl = PUBLIC_BASE_URL;

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`)
    headers.append('Content-Type', 'application/json')

    return fetch(baseUrl + url, {...options, headers: headers, credentials: 'include'}) 
}


export { fetch_ } 