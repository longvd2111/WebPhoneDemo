
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UpdateProduct() {

    const { id } = useParams();
    const [product, setProduct] = useState({});

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    

    const [name, setName] = useState(product.name);
    const [cateId,setCateId] = useState(parseInt(product.quantity));
    const [price, setPrice] = useState(parseInt(product.price));
    const [quantity, setQuantity] = useState(product.quantity);
    const [description,setDiscription] = useState(product.description);
    const [createAt, setCreateAt] = useState(new Date(product.createAt));
    const [status, setStatus] = useState(product.status);
    const [image,setImage] = useState(product.image);


    useEffect(() => {
        fetch('http://localhost:9999/products')
            .then(res => res.json())
            .then(result => { setProducts(result) });

        fetch('http://localhost:9999/categories')
            .then(res => res.json())
            .then(result => { setCategories(result) });
        fetch(`http://localhost:9999/products/${id}`)
            .then(res => res.json())
            .then(result => {
                setProduct(result);
                setName(result.name);
                setPrice(result.price);
                setQuantity(result.quantity);
                setCreateAt(result.createAt);
                setCateId(result.cateId);
                setStatus(result.status);
            });
    }, []);

    


    console.log("ID:" + id + "   Name:" + name+" Price"+price);
    const currentDate = new Date().toISOString().split('T')[0];


    const [msgId, setMsgId] = useState('');
    const [msgName, setMsgName] = useState('');
    const [msgPrice, setMsgPrice] = useState('');
    const [msgQuanity, setMsgQuantity] = useState('');
    const [msgCreateAt, setMsgCreateAt] = useState('');


    const FORMID = /^P\d{3}$/;

    const validProduct = (newProduct) => {
        let message = "";

        if (name.length == 0) {
            message = message + "Name can not empty!";
            setMsgName("Name can not empty!");
            
        }
        if (price < 0) {
            message = message + "Price must be bigger than 0!\n";
            setMsgPrice("Price must be bigger than 0!")
            
        }
        if (quantity < 0) {
            message = message + "Quantity must be bigger than 0!\n";
            setMsgQuantity("Quantity must be bigger than 0!");
            
        }
        if (createAt < currentDate) {
            message = message + "CreateAt can not be the day in the past!\n";
            setMsgCreateAt("CreateAt can not be the day in the past!");
            
        }

        if (message.length != 0) {
            alert(message);
            return false;
        }
        else {
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newProduct = {
            id: id,
            name: name,
            price: price,
            quantity: quantity,
            cateId: cateId,
            createAt: createAt,
            status: status
        }

        if (validProduct(newProduct)) {


                 fetch(`http://localhost:9999/products/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: id,
                        name: name,
                        price: price,
                        quantity: quantity,
                        cateId: cateId,
                        createAt: createAt,
                        status: status
                    }),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                  })
                    .then((response) => response.json())
                    .then((result) => {if (result) {
                        alert(`${result.name} updated success!`);
                        navigate('/');
                        }
                    });    
        }

    }

    return (
        <Container>
            <Row>
                <Col >
                    <a href='/' style={{ float: 'right', fontSize: '20px' }}>Back to home</a>
                </Col>
            </Row>

            <Row style={{ borderRadius: '15px', border: 'solid 2px orange', marginTop: '30px' }}>
                <Col xs={12}>
                    <h3 style={{ textAlign: 'center', alignItems: 'center', color: 'blue' }}>Update product</h3>
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='id'>
                            <Form.Label>Id(*)</Form.Label>
                            <Form.Control type='text' readOnly Value={id}></Form.Control>
                            <span style={{ color: 'red' }}>{msgId != "" ? msgId : ''}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Product name(*)</Form.Label>
                            <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name} />
                            <span style={{ color: 'red' }}>{msgName != "" ? msgName : ''}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price(VND)</Form.Label>
                            <Form.Control type="number" min={0} onChange={(e) => setPrice(parseInt(e.target.value))} Value={price} />
                            <span style={{ color: 'red' }}>{msgPrice != "" ? msgPrice : ''}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" min={0} onChange={(e) => setQuantity(parseInt(e.target.value))} Value={quantity} />
                            <span style={{ color: 'red' }}>{msgQuanity != "" ? msgQuanity : ''}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="createAt">
                            <Form.Label>createAt</Form.Label>
                            <Form.Control required type='date' onChange={(e) => setCreateAt(e.target.value)} Value={createAt}></Form.Control>
                            <span style={{ color: 'red' }}>{msgCreateAt != "" ? msgCreateAt : ''}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cateId">
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={cateId} onChange={(e) => setCateId(parseInt(e.target.value))}>
                                {categories?.map(c => (
                                    <option key={c.id} value={c.id} selected={c.id === cateId}>{c.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="status">
                            <Form.Check label="Status" onChange={(e) => setStatus(e.target.checked)}
                                checked={status == true}
                            />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default UpdateProduct