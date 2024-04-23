import React, { useEffect, useState } from 'react';
import { Nav, Table, Container, Image, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function Cart() {

    const [products,setProducts] = useState([]);
    const [cartProduct,setCartProduct] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);

    let totalAmount = 0;
    const VAT = 0.08;


    for (let index = 0; index < cartProduct.length; index++) {
        totalAmount += totalAmount + (cartProduct[index].price*cartProduct[index].quantity);
    }


    const handleClearAll = () => {
        setCartProduct([]);
        localStorage.removeItem('cart');
    }


    return (
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            {cartProduct && cartProduct.length == 0 ? (
                <h3 style={{ color: 'red' }}>No product available</h3>
            ) : (
                <Row>
                    <Col style={{ textAlign: 'right' }}>
                        <Button className='btn btn-danger' onClick={(e) => handleClearAll()}>Clear All</Button>
                    </Col>
                    <Table striped bordered hover sm={12}>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartProduct && cartProduct.map(p => (
                                    <tr key={p.id} style={{ textAlign: 'center' }}>
                                        <td>{p.id}</td>
                                        <td>{p.name}</td>
                                        <td>{p.price}</td>
                                        <td><Image height={'40px'} width={'auto'} src={`/assets/images/${p.image}`}></Image></td>
                                        <td><span>{p.quantity}</span></td>
                                        <td>{p.Total}VND</td>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </Table>

                    <Col style={{ textAlign: 'right' }} sm={12}>
                        <span style={{ fontSize: '30px' }}>VAT: {VAT}%</span>
                    </Col>
                    <Col style={{ textAlign: 'right' }} sm={12}>
                        <span style={{ fontSize: '30px' }}>Total amount: {totalAmount}VND</span>
                    </Col>

                    <Col style={{ textAlign: 'right' }} sm={12}>
                        <span style={{ fontSize: '30px' }}>Amount with VAT: {totalAmount+totalAmount*VAT/100}VND</span>
                    </Col>

                    <Col style={{ textAlign: 'right' }}>
                        <Link className='btn btn-success' to={'/cart/verifyOrder'}>Check Out</Link>
                    </Col>
                </Row>

            )}



        </Container>
    )
}

export default Cart