
import { Nav, Table, Container, Row, Col, Card, Button, Pagination, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { logDOM } from '@testing-library/react';


function ProductsView() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cateId, setCateId] = useState(0);
    const [search, setSearch] = useState('');

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart'))?JSON.parse(localStorage.getItem('cart')):[]);
    
    const [lengthOfCart,setLengthOfCart] = useState(cart?cart.length:0);

    useEffect(() => {
        fetch('http://localhost:9999/products')
            .then(res => res.json())
            .then(result => {
                let searchResult = [];

                if (cateId == 0) {

                    searchResult = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
                    setProducts(searchResult);
                } else {

                    searchResult = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && p.cateId == cateId);
                    
                    setProducts(searchResult);
                }
            });

        fetch('http://localhost:9999/categories')
            .then(res => res.json())
            .then(result => { setCategories(result) });

            
    }, [cateId, search]);


    const addToCart = async (productId) => {


        const product = products.find(p=>p.id==productId);
        const existingProductIndex = cart.findIndex(item => item.id === productId);  
        
        if (existingProductIndex!==-1) {
            
            cart[existingProductIndex].quantity +=1;
            setLengthOfCart(cart.length);
            
        } else {
            const productToAdd = {  id: productId,
                                    name:product.name,
                                    price:product.price,
                                    image:product.image,                                   
                                    quantity: 1 };
            cart.push(productToAdd);
            setLengthOfCart(cart.length);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }



    return (
        <Container>

            <Row style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>

                <Col xs={6} style={{ alignItems: 'center' }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="text"
                                placeholder="Enter product name to search ..."
                                style={{ border: "1px solid gray" }}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>


            <Row sm={12} >
                <Col sm={12} md={2}>
                    <div key={`reverse`} className="mb-3">
                        <Form.Check key={0} type={'radio'} name="category" value={0} label="Show All" onChange={(e) => setCateId(parseInt(e.target.value))} />
                        {
                            categories?.map(c => (
                                <Form.Check key={c.id} type={'radio'} name="category" value={c.id} label={c.name} onChange={(e) => setCateId(parseInt(e.target.value))} />
                            ))
                        }
                    </div>
                </Col>
                <Col xs={12} md={10}>
                    <Row  >
                        <Col className='text-end'>
                            <Link className='btn btn-success'to={'/cart'} >Cart({lengthOfCart})</Link>
                        </Col>
                    </Row>
                    <Row>

                        {products.map(product => (
                            <Col key={product.id} lg={3} sm={6} >
                                <Card style={{ marginBottom: '2rem' }}>
                                    <Card.Img variant="top" src={`/assets/images/${product.image}`} style={{ height: '15rem', width: 'auto' }} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            {product.price}
                                        </Card.Text>
                                        <Link className='btn btn-primary' to={`/product/${product.id}`}>Show detail</Link>
                                        <Button className='btn-info' onClick={(e) => addToCart(product.id)}>Add to cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>




            <Row>
                <Pagination></Pagination>
            </Row>
        </Container>
    )
}

export default ProductsView