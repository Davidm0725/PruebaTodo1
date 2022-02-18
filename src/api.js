import { enviroment } from "./enviroments/enviroments";

async function callApi(URL, path, options = {}) {
    const header = new Headers();
    header.append('Access-Control-Allow-Origin', '*');


    if (options.method === 'POST') {
        header.append('content-type', 'application/json');
    }

    options.headers = header;
    const url = URL + path;
    const call = await fetch(url, options);
    const response = await call.json();
    return response;
}

export const api = {
    request: {
        getProducts() {
            return callApi(enviroment.getProducts, "",
                {
                    method: 'GET'
                }
            )

        },

        requestApiPayment(params) {
            return callApi(enviroment.payments, "",
                {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(params)
                }
            )

        },
    }
}
