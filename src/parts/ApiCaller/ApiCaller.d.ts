import { AxiosResponse } from 'axios';

export interface IDefaultJsonReturn<T> {
    err: string;
    data: T;
}

export interface IGetScrapedUrlData {
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

export interface IGetScrapedUrlDataResponse extends AxiosResponse<IDefaultJsonReturn<IGetScrapedUrlData>> {}