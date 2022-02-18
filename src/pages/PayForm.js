import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { Component } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { api } from './../api.js';




const initState = {
    open: true,
    amountPay: 0
}

class PayForm extends Component {

    constructor(props) {
        super(props);

        this.state = initState;


    }

    componentDidMount() {
        console.log(this.props);
        this.calculatePay();
    }

    handleClose = () => {
        const { updateStateShopDetail } = this.props;
        updateStateShopDetail({ pay: false });
        this.setState({ open: false })
    }

    doPayment = () => {
        // const { amountPay } = this.state;
        // const paramsBody = {
        //     pass: "***",
        //     email: "david@gmail.com",
        //     credictNum: "4747585",
        //     amount: amountPay
        // }
        // const data = api.request.requestApiPayment(paramsBody);
        // data.then((response) => {
        //     this.handleRespApi(response);
        // })
        //     .catch(e => {
        //         console.log(e);
        //     });
        const resp = {
            "message": "Success",
            "status": 200
          }
          this.handleRespApi(resp);
    }

    handleRespApi = (response) => {
        const { updateStore, stateShopDetail, store, updateStateShopDetail } = this.props;
        const { shopItem, numTshirt } = stateShopDetail;
        var cloneItem = shopItem;
        let cloneArrayTshirts = [...store.tshirts];
        if (response.status === 200) {
            console.log('Pago exitoso');
            cloneItem.stock = cloneItem.stock - numTshirt;
            var rowFinded = cloneArrayTshirts.findIndex(e => e.id === cloneItem.id);
            var findedItem = cloneArrayTshirts.find(e => e.id === cloneItem.id);
            cloneArrayTshirts.splice(rowFinded, 1, findedItem);
            updateStore({tshirts: cloneArrayTshirts});
            updateStateShopDetail({ pay: false, numTshirt: 0 });

        } else {
            console.log('Presentamos inconvenientes al realizar el pago, por favor intente más tarde.')
        }
    }

    calculatePay = () => {
        const { stateShopDetail } = this.props;
        const { numTshirt, shopItem } = stateShopDetail;
        var amountTshirts = numTshirt;
        var priceForTshirt = Number(shopItem.price);
        var totalAmount = priceForTshirt * amountTshirts;
        this.setState({ amountPay: totalAmount });
    }

    render() {
        const { open, amountPay } = this.state;
        return (
            <div>
                <Dialog open={open} >
                    <DialogTitle>Datos de pago</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Todos los campos son requeridos.
                        </DialogContentText>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="name@example.com" required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" required />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Número de tarjeta de credito"
                            className="mb-3">

                            <Form.Control type="number" placeholder="Numero de tarjeta de credito" required />
                        </FloatingLabel>

                        <FloatingLabel
                            label="Valor total:"
                            className="mb-3">
                        </FloatingLabel>
                        <label className="label-pay">
                            <strong>$
                                {
                                    amountPay
                                }
                            </strong>
                        </label>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()}>Cancelar</Button>
                        <Button onClick={() => this.doPayment()}>Realizar pago</Button>
                    </DialogActions>
                </Dialog>

            </div >
        );
    }
}

export default PayForm;