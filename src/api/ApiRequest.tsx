import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {url} from './Url'

const axiosClient = axios.create({
    baseURL: url.baseURL,
});

const request = async (axiosConfig: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axiosClient.request(axiosConfig);
};


export default request;
