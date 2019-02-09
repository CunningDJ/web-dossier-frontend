
/**
 * React JSDOM Scraper utilities
 */

const LOCALHOST = "localhost";

export function isLocalhost(): boolean {
    return location.hostname === LOCALHOST;
}