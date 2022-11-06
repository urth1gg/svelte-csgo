import type { Cookies } from '@sveltejs/kit';

function destroyUserCookie(cookies: Cookies): void{
    cookies.set('user', '', { maxAge: -1, path: '/'})
}

function destroyRefreshTokenCookie(cookies: Cookies): void{
    cookies.set('rf_token', '', { maxAge: -1, path: '/'})
}

export { destroyRefreshTokenCookie, destroyUserCookie }