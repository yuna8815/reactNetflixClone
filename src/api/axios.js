import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "a1069f3530c2f45d5cdbf5a56a057cfa",
    language: "ko"
  }
});

export default instance;