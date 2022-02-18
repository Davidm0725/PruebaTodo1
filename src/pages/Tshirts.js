import { Component } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import tShirt from "../static/image/camiseta-comics.jpg";
import DBZ from "../static/image/dbz-camiseta.jpg";
import marvel from "../static/image/marvel.jpg";
import freefire from "../static/image/f-fire.jpg";
import ShopDetail from "./ShopDetail";



const initState = {
    flagShop: false,
    shirtsData: [],
    itemShop: {}
}

class Tshirt extends Component {

    constructor(props) {
        super(props);

        this.state = initState;


    }

    componentDidMount() {
        const { store } = this.props;
        this.setState({ shirtsData: store.tshirts });
    }

    chooseTshirt = cod => {
        switch (cod) {
            case "tShirt":
                return tShirt;
            case "DBZ":
                return DBZ;
            case "marvel":
                return marvel;
            default:
                return freefire;

        }
    }

    shopItem = item => {
        const { flagShop } = this.state;
        this.setState({ flagShop: !flagShop, itemShop: item });
    }

    updateStateTshirt = (field) => {
        this.setState(field)
    }

    render() {
        const { updateStore, store } = this.props;
        const { flagShop, shirtsData } = this.state;
        const { chooseTshirt, shopItem, updateStateTshirt } = this;
        return (
            <div>
                {
                    !flagShop ?
                        <div className="cont-cards">
                            <CardGroup>
                                {
                                    shirtsData.map(e =>
                                        < Card style={{ width: '18rem', marginBottom: '20px', borderRadius: '5px' }} className="card">
                                            <Card.Img variant="top" src={chooseTshirt(e.img)} />
                                            <Card.Body>
                                                <Card.Title>{e.details}</Card.Title>
                                                <Card.Text>
                                                  Stock: &nbsp; <span style={{color: e.stock > 0 ? 'green': 'red'}}>{ e.stock > 0 ? "Disponible": "No Disponible" }</span>
                                                </Card.Text>
                                                <Button variant="outline-dark" onClick={() => shopItem(e)} disabled={e.stock === 0 }>Comprar</Button>
                                            </Card.Body>
                                        </Card>
                                    )
                                }
                            </CardGroup>
                        </div>
                        : <ShopDetail updateStateTshirt={updateStateTshirt}  updateStore={updateStore} store={store} itemDetail={this.state.itemShop}/>
                }

            </div >
        );
    }
}

export default Tshirt;