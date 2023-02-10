import { ITweet } from "../components/tweet";
import { IUser } from "../store/userSlice";
import * as apiUrl from "./api-url";
import axios from "./interceptors";

export default {
  signUpAccount(data: { email: string; username: string; password: string }) {
    return axios({
      method: "POST",
      url: apiUrl.USER_DATA,
      data,
    });
  },
  signIn(data: { username: string; password: string }) {
    return axios({
      method: "POST",
      url: `${apiUrl.USER_AUTH}/sign_in`,
      data,
    });
  },
  checkUserAuth(token: string) {
    return axios({
      method: "GET",
      url: `${apiUrl.USER_AUTH}/check`,
      data: { access_token: token },
    });
  },
  exploreTweets() {
    return axios({
      method: "GET",
      url: `${apiUrl.TWEET_DATA}/explore`,
    });
  },
  getTimelineTweets(id: string) {
    return axios({
      method: "GET",
      url: `${apiUrl.TWEET_DATA}/user/${id}`,
    });
  },
  getUser(id: string) {
    return axios({
      method: "GET",
      url: `${apiUrl.USER_DATA}/${id}`,
    });
  },
  updateUser(data: IUser) {
    return axios({
      method: "PUT",
      url: `${apiUrl.USER_DATA}/${data._id}`,
      data,
    });
  },
  deleteUser(id: string) {
    return axios({
      method: "DELETE",
      url: `${apiUrl.USER_DATA}/${id}`,
    });
  },
  getUserAllTweets(userId: string) {
    return axios({
      method: "GET",
      url: `${apiUrl.TWEET_DATA}/user/${userId}`,
    });
  },
  follow(
    userId: string,
    data: {
      target_id: string;
    }
  ) {
    return axios({
      method: "PUT",
      url: `${apiUrl.USER_DATA}/${userId}/follow`,
      data,
    });
  },
  unFollow(
    userId: string,
    data: {
      target_id: string;
    }
  ) {
    return axios({
      method: "PUT",
      url: `${apiUrl.USER_DATA}/${userId}/follow`,
      data,
    });
  },
  createTweet(data: ITweet) {
    return axios({
      method: "POST",
      url: `${apiUrl.TWEET_DATA}/user/${data.userId}`,
      data,
    });
  },
  updateTweetLike(tweetId: string, userId: string) {
    return axios({
      method: "PUT",
      url: `${apiUrl.TWEET_DATA}/${tweetId}/user/${userId}/like`,
    });
  },
};
