import { Component } from "react";
import { api } from './../api.js';
import Tshirt from "../pages/Tshirts";
import { initStore } from "../helpers/constants.js";
import { Spinner } from "react-bootstrap";


class Container extends Component {

    constructor(props) {
        super(props);

        this.state = initStore;
    }

    componentDidMount() {
        this.doRequestApiProducts();

    }

    doRequestApiProducts() {
        const data = api.request.getProducts();
        data.then((response) => {
            this.responseHandle(response);
        })
            .catch(e => {
                this.handleshow(e);
            });
    }

    responseHandle(respApi) {
        const { show } = this.state;
        const { tshirts, cups, toys, accesories } = respApi.products;
        console.log(respApi)
        if (respApi.products) {
            const cloneStore = Object.assign({}, initStore);
            cloneStore.tshirts = tshirts;
            cloneStore.cups = cups;
            cloneStore.toys = toys;
            cloneStore.accesories = accesories;
            sessionStorage.setItem('store', JSON.stringify(cloneStore));
            this.setState({ show: !show, tshirts, cups, toys, accesories })
        } else {
            this.handleshow("");
        }


    }

    updateStore = (data) => {
        this.setState(data)
        sessionStorage.setItem('store', JSON.stringify(this.state));
    }

    handleshow(e) {
        const { show, error } = this.state;
        this.setState({ show: !show, error: !error })
        console.log('Presentamos inconvenientes con el sistema, por favor intenta más tarde.', JSON.stringify(e));
    }

    render() {
        const { show } = this.state;
        const { updateStore } = this;
        return (
            <div>
                {
                    !show ? <div className="spinnerLoad"><Spinner animation="border" /> </div> : <Tshirt store={this.state} updateStore={updateStore} />
                }

            </div>
        );
    }
}

export default Container;