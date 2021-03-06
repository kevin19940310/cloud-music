import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest = (type, area, alpha, count) => {
  return axiosInstance.get(`/artist/list?type=${type}&area=${area}&initial=${alpha && alpha.toLowerCase()}&offset=${count}`);
}


 // 排行榜
export const getRankListRequest = () => {
  return axiosInstance.get (`/toplist/detail`);
};


// 推荐歌单
export const getAlbumDetailRequest = id => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
};

// 歌手歌单列表
export const getSingerInfoRequest = id => {
  return axiosInstance.get (`/artists?id=${id}`);
};