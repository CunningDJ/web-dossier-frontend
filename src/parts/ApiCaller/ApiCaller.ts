import axios from 'axios';

import {
    IGetScrapedUrlDataResponse,

    IGetScrapedReaderDataResponse
 } from './ApiCaller.d';

import apiConfig from './apiConfig';

import { isLocalhost } from '../../util';

// Setting API base path to localhost vs web server
//   based on whether this is a dev or prod environment
const API_BASE = isLocalhost() ? apiConfig.base.dev : apiConfig.base.prod;

const API_PATH = {
    urlScrape: apiPath('/url-scrape'),   // /url-scrape?url={url},
    readerScrape: apiPath('/reader')     // /reader?url={url}
}

/*
 * utils
 */
function apiPath(subPath: string) {
    return API_BASE + subPath;
}

/**
 * URL scrape data
 */
export function getScrapedUrlData(url: string): Promise<IGetScrapedUrlDataResponse> {
    const urlQuery = { url };
    return axios.get(API_PATH.urlScrape, { params: urlQuery });
}


/**
 * Reader scrape data
 */
export function getScrapedReaderData(url: string): Promise<IGetScrapedReaderDataResponse> {
  const urlQuery = { url };
  return axios.get(API_PATH.readerScrape, { params: urlQuery });
}
