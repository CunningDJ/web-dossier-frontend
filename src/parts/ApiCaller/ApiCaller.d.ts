import { AxiosResponse } from 'axios';

export interface IDefaultJsonReturn<T> {
    err: string;
    data: T;
}

/**
 * Url Scraper
 */
export interface IGetScrapedUrlDataReturn {
  title: string;
  description: string;

  anchorsCount: number;
  anchorHosts: IAnchorHostsStats;

  paragraphs: string[];
}

export interface IAnchorHostsStats {
    [host: string]:
        { href: string, text: string }[];
}

export interface IGetScrapedUrlDataResponse extends AxiosResponse<IDefaultJsonReturn<IGetScrapedUrlDataReturn>> {}

/**
 * Reader Scraper
 */

export interface IGetScrapedReaderDataReturn {
  rawHTML: string;
}

export interface IGetScrapedReaderDataResponse extends AxiosResponse<IDefaultJsonReturn<IGetScrapedReaderDataReturn>> {}
