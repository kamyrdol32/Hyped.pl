// Imports
import React, {useContext} from 'react';
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import ThemeContext from "../Context/ThemeContext";

// CSS
import '../Styles/Navbar.css';

// Code
function MyNavBar (props) {
    const {theme, setTheme} = useContext(ThemeContext);
	const changeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    let theme_icon = theme === 'dark' ? 'fa fa-sun' : 'fa fa-moon';

    return (
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className=" navbarScroll">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Hyped.pl</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <NavDropdown title="Trendy" id="navbarScrollingDropdown">
                                <NavDropdown.Item disabled="True">Top 100 - Filmy</NavDropdown.Item>
                                <NavDropdown.Item disabled="True">Top 100 - Seriale</NavDropdown.Item>
                            </NavDropdown>
                            <LinkContainer to="/Films">
                                <Nav.Link>Filmy</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/Series">
                                <Nav.Link>Series</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl type="search" placeholder="Fraza" className="me-2" aria-label="Search" />
                            <Button variant="outline-warning">Wyszukaj</Button>
                        </Form>
                        {!props.token && props.token !== "" && props.token !== "undefined"?
                            <Nav>
                                <LinkContainer to="/login">
                                    <Nav.Link className="ps-4">Zaloguj</Nav.Link>
                                </LinkContainer>
                            </Nav>
                            :(
                            <Nav>
                                <LinkContainer to="/profile">
                                    <Nav.Link className="ps-4">Profil</Nav.Link>
                                </LinkContainer>
                            </Nav>
                            )}
                        <Nav>
                            <Container>
                                <Nav.Link onClick={changeTheme} className="ps-4"><span className={theme_icon}></span></Nav.Link>
                            </Container>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
  );
}

export default MyNavBar;