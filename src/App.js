import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/home">MovieProject</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="/home"><span className="glyphicon glyphicon-home"></span> Home</NavItem>
                            <NavItem eventKey={2} href="/list"><span className="glyphicon glyphicon-th-list"></span> List</NavItem>
                            <NavItem eventKey={2} href="/create"><span className="glyphicon glyphicon-file"></span> Create</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                {this.props.children}
            </div>
        )
    }
}

export default App;
