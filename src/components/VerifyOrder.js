import React, { useState, useEffect } from 'react';
import { Nav, Table, Container, Row, Col, Card, Button, Pagination, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function VerifyOrder() {

    const currentDate = new Date().toISOString().split('T')[0];
    const [requireDate, setRequireDate] = useState('');

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];

    const customerId = user ? user.id : null;
    const [email, setEmail] = useState(user ? user.email : '');
    const [firstName, setFirstName] = useState(user ? user.firstName : '');
    const [lastName, setLastName] = useState(user ? user.lastName : '');
    const [address, setAddress] = useState(user ? user.address : '');
    const [phone, setPhone] = useState(user ? user.phone : '');

    const [msgEmail, setMsgEmail] = useState('');
    const [msgPhone, setMsgPhone] = useState('');
    const [msgRequireDate, setMsgRequireDate] = useState('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^\d{10}$/;


    const [cartProduct, setCartProduct] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    let totalAmount = 0;
    let totalAmountBeforeDisCount = 0;
    const VAT = 0.08;
    const discount = 10;

    const cartOrder = cartProduct.map(p => {
        return {
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            vat: VAT,
            discount: discount
        }
    })

    for (let index = 0; index < cartProduct.length; index++) {
        totalAmountBeforeDisCount += totalAmountBeforeDisCount + cartOrder[index].quantity * cartOrder[index].price;
        totalAmount += totalAmount + (cartOrder[index].quantity * cartOrder[index].price) * (1 + VAT) * (100 - discount) / 100;
    }

    const validUser = (userOrder) => {
        let valid = true;
        if (email.length == 0) {
            setMsgEmail("Email can not empty!");
            valid = false;
        }
        if (!email.match(emailRegex)) {
            setMsgEmail("Wrong format, the format must be username@gmail.com! Ex: abc@gmail.com");
            valid = false;
        }

        if (!phone.match(phoneRegex)) {
            setMsgPhone("Phone number must contain 10 numbers!");
            valid = false;
        }
        if (requireDate < currentDate) {
            setRequireDate("RequireDate can not be the day in the past!");
            valid = false;
        }
        return valid;
    }

    const handleVerifyOrder = (e) => {
        e.preventDefault();

        const customer = {
            customerId: user ? user.id : null,
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            email: email
        }

        if (validUser(customer)) {
            console.log(currentDate);
            console.log(msgRequireDate);
            console.log(customer);
        }
    }

    return (
        <Container>
            <Row>
                <Col >
                    <a href='/cart' style={{ float: 'right', fontSize: '20px' }}>Back</a>
                </Col>
            </Row>
            <Row>
                <Col xs={12} >
                    <h3 style={{ textAlign: 'center', alignItems: 'center', color: 'blue' }}>Verify Order</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    
                        <Row sm={12}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartOrder.map(c => (
                                            <tr key={c.id}>
                                                <td>{c.id}</td>
                                                <td ><Link className='' style={{ textDecoration: 'none' }} to={`/product/${c.id}`}>{c.name}</Link></td>
                                                <td>{c.price}</td>
                                                <td>{c.quantity}</td>
                                                <td>{c.quantity * c.price}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                        </Row>
                        <Row style={{ textAlign: 'right' }} sm={12}>
                            <Col style={{ fontSize: '15px' }}>VAT: {VAT}%</Col>
                        </Row>
                        <Row style={{ textAlign: 'right' }} sm={12}>
                            <Col style={{ fontSize: '15px' }}>Discount: {discount}%</Col>
                        </Row>
                        <Row style={{ textAlign: 'right' }} sm={12}>
                            <Col style={{ fontSize: '20px' }}>Price(Before discount): {totalAmountBeforeDisCount}VND</Col>
                        </Row>
                        <Row style={{ textAlign: 'right' }} sm={12}>
                            <Col style={{ fontSize: '20px' }}>Total amount: {totalAmount}VND</Col>
                        </Row>

                    
                </Col>

                <Col>
                    <Row style={{ borderRadius: '15px', border: 'solid 2px orange' }}>

                        <Col>
                            <Form onSubmit={handleVerifyOrder}>
                                <Form.Group controlId='id'>
                                    <Form.Label>CustomerId</Form.Label>
                                    <Form.Control type='text' readOnly value={customerId}></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>FirstName</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                    <span style={{ color: 'red' }}>{msgEmail != "" ? msgEmail : ''}</span>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setPhone(e.target.value)} value={phone} />
                                    <span style={{ color: 'red' }}>{msgPhone != "" ? msgPhone : ''}</span>
                                </Form.Group>

                                <Form.Group className='mb-3'>
                                    <Form.Label>Require Date</Form.Label>
                                    <Form.Control required type='date' onChange={(e) => setRequireDate(e.target.value)}></Form.Control>
                                    <span style={{ color: 'red' }}>{msgRequireDate != "" ? msgRequireDate : ''}</span>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
                                </Form.Group>

                                <Form.Group className='="mb-3' style={{ textAlign: 'right' }}>
                                    <Button variant="success" type="submit">
                                        Checkout
                                    </Button>
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>


        </Container>
    )
}

export default VerifyOrder