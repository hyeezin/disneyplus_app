import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "83e6d37649f3a2ec4815b583b0a0d74d",
        language: "ko-KR"
    }
})

export default instance;