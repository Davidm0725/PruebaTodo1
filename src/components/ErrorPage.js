import { Component } from "react";
import pageError from "./../static/image/errorpage.jpg";



class ErrorPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div  className="img-error">
               <img style={{height: '476px'}} src={pageError} />
            </div>
        );
    }
}

export default ErrorPage;