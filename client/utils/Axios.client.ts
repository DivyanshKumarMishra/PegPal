import axios, { type RawAxiosRequestHeaders } from 'axios';

const headersObj: RawAxiosRequestHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const axios_next = axios.create({
  headers: headersObj,
  withCredentials: true,
});

export { axios_next };
