class TokenService {
  getToken() {
    return localStorage.getItem('access_token');
  }

  setToken(token) {
    localStorage.setItem('access_token', token);
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }

  hasToken() {
    return !!this.getToken();
  }
}

export default new TokenService();