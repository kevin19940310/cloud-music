import axios from 'axios'

export const baseUrl = 'http://47.96.9.165:3000/';

//axios 的实例及拦截器配置
const axiosInstance = axios.create ({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use (
  res => res.data,
  err => {
    console.log (err, "网络错误");
  }
);

export {
  axiosInstance
};

//顶部的高度
export const HEADER_HEIGHT = 45;