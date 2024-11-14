import axios, { AxiosInstance } from "axios";
import { STORAGE_KEY } from "../constants/";
// import { notificationError } from "./notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "@/api";

export class Http {
  public instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: STORAGE_KEY.BASE_URL,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        _retry: true,
      },
    });

    this.instance.interceptors.request.use(
      async (config) => {
        const accessToken = await AsyncStorage.getItem(
          STORAGE_KEY.ACCESS_TOKEN
        );
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error.response?.data)
    );

    let isRefreshToken = false;
    let requestsToRefresh: any[] = [];

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const { config } = error;
        if (error?.response?.status === 401) {
          // return Promise.reject(error);
          const refreshToken = await AsyncStorage.getItem(
            STORAGE_KEY.REFRESH_TOKEN
          );
          const id = await AsyncStorage.getItem(STORAGE_KEY.ID);
          if (!refreshToken || !id) {
            localStorage.clear();
            return (window.location.href = "/login");
          }

          if (!isRefreshToken) {
            // @todo update status isRefresh to be true
            isRefreshToken = true;

            authAPI
              .refresh({
                id,
                refresh_token: refreshToken,
                is_new_refresh_token: false,
              })
              .then((response) => {
                requestsToRefresh.forEach((callback) => {
                  callback(response.data.access_token);
                });
                // localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, response.data.access_token);
                // return this.instance.request(config);
              })
              .catch((error) => {
                requestsToRefresh.forEach((cb) => cb(null));
                localStorage.clear();
                return (window.location.href = "/login");
              })
              .finally(() => {
                // 5. After that, to clear all setup
                isRefreshToken = false;
                requestsToRefresh = [];
              });
          }

          // 3. Setup callback to change token in headers authorization
          return new Promise((resolve, reject) => {
            requestsToRefresh.push(async (token: any) => {
              if (token) {
                await AsyncStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, token);
                // Reset access_token for another request behind
                config.headers.Authorization = `Bearer ${token}`;
                resolve(this.instance.request(config));
              }

              reject(error);
            });
          });
        }

        // notificationError("", error.response?.data);
        return Promise.reject(error.response?.data);
      }
    );
  }
}

const http = new Http().instance;

export default http;
