import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import cartBuy from '../static/icons/Cart1.png'

function HeaderPage() {
  return (
    <div >
      <header className="App-header">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container fluid>
            <Navbar.Brand style={{ border: "1px solid white", borderRadius: '5px'}}>
                <span style={{paddingLeft: "5px", paddingRight: "5px"}}>Hulk Store</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >           
    
              </Nav>

              <Button variant="light">
                <img src={cartBuy} className="app-icon"/>
              </Button>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default HeaderPage;