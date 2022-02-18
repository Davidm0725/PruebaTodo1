import { Component } from "react";
import { Button, Card, CardGroup, Form, FormControl, InputGroup } from "react-bootstrap";
// import { initStore } from "../helpers/constants";
import tShirt from "../static/image/camiseta-comics.jpg";
import DBZ from "../static/image/dragonballz.jpg";
import marvel from "../static/image/marvel.jpg";
import freefire from "../static/image/f-fire.jpg";
import PayForm from "./PayForm";



const initState = {
    shopItem: "",
    numTshirt: 0,
    size: "",
    pay: false
}


class ShopDetail extends Component {

    constructor(props) {
        super(props);

        this.state = initState;
    }

    componentDidMount() {
        const { itemDetail } = this.props;
        this.setState({ shopItem: itemDetail, size: itemDetail.size[0] })
    }

    chooseImg = cod => {
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

    increment = () => {
        const { store, itemDetail } = this.props
        const { numTshirt } = this.state;
        var cont = numTshirt;
        if (cont < itemDetail.stock) {
            cont++;
            this.setState({ numTshirt: cont })
        }
    }

    decrement = () => {
        const { numTshirt } = this.state;
        var contRest = numTshirt;
        contRest--;
        this.setState({ numTshirt: contRest })

    }
    updateStateShopDetail = (dataUpdate) => {
        this.setState(dataUpdate)
    }

    render() {
        const { store, updateStateTshirt, itemDetail, updateStore } = this.props;
        const { numTshirt, pay } = this.state;

        const { chooseImg, increment, decrement, updateStateShopDetail } = this;
        return (
            <section>
                <div >
                    <CardGroup>
                        < Card style={{ width: '10rem', marginBottom: '20px', borderRadius: '5px' }} className="card">
                            <Card.Img variant="top" src={chooseImg(itemDetail.img)} />
                        </Card>
                        < Card style={{ width: '10rem', marginBottom: '20px', borderRadius: '5px' }} className="card">
                            <Card.Body>
                                <Card.Title className="general-space"><h1>{itemDetail.details}</h1></Card.Title>
                                <Card.Text className="general-space"><h2>Precio: &nbsp;${itemDetail.price}</h2></Card.Text>
                                <Card.Text className="general-space"><h2>stocks: &nbsp;<span style={{ color: itemDetail.stock > 0 ? 'green' : 'grey' }}>{itemDetail.stock > 0 ? "Disponible" : "No disponible"}</span></h2></Card.Text>
                                <div style={{ paddingTop: '30px' }}>
                                    <label><h5>Talla</h5></label>
                                    <Form.Select aria-label="select example" size="lg" onChange={(e) => this.setState({ size: e.target.value })}>
                                        {
                                            itemDetail.size.map(e => <option value={e}>{e}</option> )
                                        }
                                    </Form.Select>
                                </div>
                                <div>
                                    <InputGroup size="lg" className="mb-3" style={{ paddingTop: '40px' }}>
                                        <InputGroup.Text id="inputGroup-sizing-sm" >
                                            <h5>Cantidad</h5></InputGroup.Text>
                                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-lg" value={numTshirt} />
                                        <Button variant="dark" onClick={() => increment()} disabled={numTshirt >= itemDetail.stock}>+</Button>
                                        <Button variant="dark" onClick={() => decrement()} disabled={numTshirt === 0}>-</Button>
                                    </InputGroup>
                                </div>

                                <Button variant="dark" style={{ width: '100%', marginTop: '20%', marginBottom: '20px' }} onClick={() => this.setState({ pay: !pay })} disabled={numTshirt === 0 || itemDetail.stock === 0}>Pagar</Button>
                                <Button variant="light" style={{ width: '100%', border: '1px solid black' }} onClick={() => updateStateTshirt({ flagShop: false })}><span>Regresar</span></Button>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                    {
                        pay && <PayForm store={store} updateStateShopDetail={updateStateShopDetail} updateStore={updateStore} stateShopDetail={this.state}/> 
                    }

                </div >
            </section>
        );
    }
}

export default ShopDetail;