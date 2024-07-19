export const storeBearerToken = (token) => {
    localStorage.setItem('auth',token);
}

export const getBearerToken = () => {
    return localStorage.getItem('auth');
}

export const clearBearerToken = () => {
    localStorage.removeItem('auth');
}