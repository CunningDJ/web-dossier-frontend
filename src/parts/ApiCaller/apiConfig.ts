
interface IApiConfig {
    base: IApiBaseUrlConfig
}

interface IApiBaseUrlConfig {
    dev: string;
    prod: string;
}


const apiConfig: IApiConfig = {
    base: {
        dev: "http://localhost:9191",
	prod: "http://api.webdossier.net"
    }
}

export default apiConfig;
