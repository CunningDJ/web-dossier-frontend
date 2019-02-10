import * as React from 'react';
import { FormEvent, MouseEvent } from 'react';
import isUrl from 'is-url';
import * as sanitizeHtml from 'sanitize-html';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import { getScrapedReaderData } from '../parts/ApiCaller/ApiCaller';

import './ReaderPage.css';

const RED = "red";
const GREEN = "green";

const ALLOWED_READER_TAGS = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre' ];

export interface IReaderPageProps {}
export interface IReaderPageState {
  urlInput: string;
  errorMessage: string;
  errorColor: string;
  sanitizedHTML: string;
}


export default class ReaderPage extends React.Component<IReaderPageProps, IReaderPageState> {
  public constructor(props: IReaderPageProps) {
    super(props);

    this.state = {
      urlInput: "",
      errorMessage: "",
      errorColor: RED,
      sanitizedHTML: ""
    }

    this.submitUrl = this.submitUrl.bind(this);
    this.changedUrl = this.changedUrl.bind(this);
  }

  public submitUrl(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const url = this.state.urlInput;

    if (url.length === 0) {
      // no URL given
      this.setState({
        errorMessage: "You must give a url to scrape.",
        errorColor: RED
      });
    } else if (!isUrl(url)) {
      // invalid URL
      this.setState({
        errorMessage: "Invalid URL.",
        errorColor: RED
      });
    } else {
      // valid URL. fetching.
      getScrapedReaderData(url)
        .then(({ data: resData }) => {
          // fetched successfully
          const { err } = resData;
          if (err !== "") {
            this.setState({
              errorMessage: err,
              errorColor: RED
            })
            return;
          }

          const { rawHTML } = resData.data;
          const sanitizedHTML = sanitizeHtml(rawHTML, {
            allowedTags: ALLOWED_READER_TAGS
          });

          this.setState({
            sanitizedHTML
          })
        })
        .catch((err) => {
          // fetch failure
          this.setState({
            errorMessage: err.message,
            errorColor: GREEN
          })
        })
    }
  }

  public changedUrl(e: FormEvent<HTMLInputElement>) {
    const urlInput = e.currentTarget.value

    this.setState({
      urlInput
    })
  }

  public render() {
    return (
      <div className="reader-page">
        <DefaultNavbar title="Page Reader" />
        <div className="reader-page__panel item-box">
          <form className="reader-page__form">
            <div>
              <p className="reader-page__error" style={{ color: this.state.errorColor }}>{this.state.errorMessage}</p>
              <input
                className="reader-page__form-input"
                type="text"
                onChange={this.changedUrl}
                value={this.state.urlInput}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <button onClick={this.submitUrl} className="reader-page__submit-button">
                Read
              </button>
            </div>
          </form>
          <div
            className="reader-page__page-view"
            dangerouslySetInnerHTML={{ __html: this.state.sanitizedHTML }}
          />
        </div>
      </div>
    )
  }
}
