export const environment = {
  production: true
};

export const api = {
  viaCep: 'https://viacep.com.br/ws',
  usucampeao: 'http://localhost:3000'
}

export const urlsToAvoidInterceptor = [api.viaCep];