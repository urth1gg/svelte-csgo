import { accessToken } from "$lib/store/accessToken";

let val = '';
accessToken.subscribe((v) => val = v);

function fetch_(url: string, options: RequestInit = {}){
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${val}`)
    headers.append('Content-Type', 'application/json')
    return fetch(url, {...options, headers: headers, credentials: 'include'})
}

export {fetch_}