import * as React from 'react';
import { FormEvent, MouseEvent } from 'react';
import isUrl from 'is-url';

import { getScrapedUrlData } from '../ApiCaller/ApiCaller';
import { IGetScrapedUrlDataReturn, IAnchorHostsStats } from '../ApiCaller/ApiCaller.d';

import './UrlScraperPanel.css';

interface IUrlScraperPanelProps {}
interface IUrlScraperPanelState {
  urlInput: string;
  scrapeData: IGetScrapedUrlDataReturn | null,

  dataFetching: boolean;

  formError: string;
  urlInputError: string;
}

export default class UrlScraperPanel extends React.Component<IUrlScraperPanelProps, IUrlScraperPanelState> {
  constructor(props: IUrlScraperPanelProps) {
    super(props);

    this.state = {
      urlInput: "",
      scrapeData: null,

      dataFetching: false,

      formError: "",
      urlInputError: ""
    }

    this.changedUrlInput = this.changedUrlInput.bind(this);
    this.submitUrlInput = this.submitUrlInput.bind(this);
  }

  public changedUrlInput(e: FormEvent<HTMLInputElement>) {
    const newUrl: string = e.currentTarget.value;

    this.setState({
      urlInput: newUrl
    })
  }

  public submitUrlInput(e: MouseEvent<HTMLButtonElement>) {
    /**
     * Logic for fetching scraped url data
     */
    e.preventDefault();

    // resetting error messages before execution
    this.setState({
      formError: "",
      urlInputError: ""
    });

    const { urlInput } = this.state;

    // Checking validly formatted URL
    if (urlInput.length === 0) {
      this.setState({
        urlInputError: "Must enter a URL."
      })
      return;
    }

    if (!isUrl(urlInput)) {
      this.setState({
        urlInputError: "Invalid format for URL"
      })
      return;
    }

    this.setState({
      dataFetching: true
    })

    // Fetching scraped URL data via scraper server API
    getScrapedUrlData(urlInput)
      .then(({ data: resJson }) => {
        const { data, err } = resJson;
        if (err !== "") {
          // Error reported by server
          this.setState({
            formError: err,
            scrapeData: null,
            dataFetching: false
          });
        } else {
          // Data successfully retrieved
          this.setState({
            scrapeData: data,
            dataFetching: false
          })
        }
      })
      .catch((err) => {
        // Error with AJAX operation
        const errMessage = err.message; // alt: err.name + ': ' + err.message;
        this.setState({
          formError: errMessage,
          scrapeData: null,
          dataFetching: false
        })
      });
  }

  public render() {
    const sdata: IGetScrapedUrlDataReturn | null = this.state.scrapeData;
    const scrapeDataVisStyle = sdata && !this.state.dataFetching ?
                                  {} : {display: 'none'};

    return (
      <div className="url-scraper-panel">
        <form className="url-scraper-panel__form item-box">
          <p className="url-scraper-panel__form-error">{this.state.formError}</p>
          <div>
            <p className="url-scraper-panel__url-input-error">{this.state.urlInputError}</p>
            <input
              className="url-scraper-panel__url-input"
              type="text"
              onChange={this.changedUrlInput}
              value={this.state.urlInput}
              disabled={this.state.dataFetching}
              placeholder="http://example.com"
            />
          </div>
          <div>
            <button onClick={this.submitUrlInput} className="url-scraper-panel__submit-button">
              Scrape
            </button>
          </div>
        </form>

        <div className="url-scraper-panel__vis item-box" style={scrapeDataVisStyle}>
          <h1 className="url-scraper-panel__vis-title">{ sdata ? sdata.title : "" }</h1>

          <h2>Description</h2>
          <p>{ sdata ? sdata.description : "" }</p>

          <h2>Paragraph Text</h2>
          {
            sdata ?
              sdata.paragraphs.map(text => (<p>{text}</p>))
                :
              ""
          }

          <h2>Anchors</h2>
          <p><b># of Anchors:</b> {sdata ? sdata.anchorsCount : ""}</p>
          <table className="url-scraper-panel__anch-table">
            <thead>
              <th>Host</th>
              <th>Text</th>
              <th>HREF</th>
            </thead>
            <tbody>
              {sdata ? anchorHostsTableRows(sdata.anchorHosts) : ""}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


/**
 * Utils
 */

function anchorHostsTableRows(anchorHosts: IAnchorHostsStats) {
  const tableRows: any[] = [];
  Object.keys(anchorHosts).forEach((host) => {
    const hostItems = anchorHosts[host];
    host = host === "" ? "[NO HOST]" : host;
    tableRows.push(
      <tr>
        <td rowSpan={hostItems.length}>{host}</td>
        <td>{hostItems[0].text}</td>
        <td><a href={hostItems[0].href}>{hostItems[0].href}</a></td>
      </tr>
    )

     hostItems.slice(1).forEach(({ text, href }) => {
        tableRows.push(
          <tr>
            <td style={{display:"none"}}/>
            <td>{text}</td>
            <td><a href={href}>{href}</a></td>
          </tr>
        )
      })
  });
  return tableRows;
}
