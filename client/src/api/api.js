import axios from 'axios';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }

  async apiCall(request) {
    try {
      return (await request()).data;
    } catch (e) {
      console.log(e);
      return e.response.data;
    }
  }

  async getContent(path) {
    return await this.apiCall(() => this.api.get(`/${path}`));
  }

  async uploadFiles(path, files) {
    console.log(files)
    return await this.apiCall(() => this.api.post(`${path}`, files));
  }
}

const api = new Api();
export default api;
