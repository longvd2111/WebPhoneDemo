import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col, Button,Image } from 'react-bootstrap';
import axios from 'axios';

import {useNavigate} from 'react-router-dom';

function CreateProduct() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://localhost:9999/products')
            .then(res => res.json())
            .then(result => {setProducts(result)});

        fetch('http://localhost:9999/categories')
            .then(res => res.json())
            .then(result => { setCategories(result)});
    }, []);

    const currentDate = new Date().toISOString().split('T')[0];
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [cateId,setCateId] = useState(1);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description,setDiscription] = useState('');
    const [createAt, setCreateAt] = useState('');
    const [status, setStatus] = useState(true);
    const [image, setImage] = useState([]);

    

    const [msgId,setMsgId] = useState('');
    const [msgName,setMsgName] =useState('');
    const [msgPrice,setMsgPrice] =useState('');
    const [msgQuanity,setMsgQuantity] =useState('');
    const [msgCreateAt,setMsgCreateAt]=useState('');


    const FORMID = /^P\d{3}$/;

    const handleImageChange=(e)=>{
        
        const file = e.target.files[0]||[];
        setImage(file.name);
    };

   

    const validProduct = (newProduct)=>{
        let statusForm = true;



        for (let index = 0; index < products.length; index++) {
            if (products[index].id === id) {
                setMsgId("ID duplicated!");
                statusForm = false;
                break;
            }          
        }


        if (id.length==0) {
            setMsgId(msgId+"ID must be not empty!");
            statusForm = false;
        }
        if (!id.match(FORMID)) {
            setMsgId(msgId+" ID not match the format(PXXX,X is the number)! Ex: P123");
            statusForm = false;
        }
        if (name.length==0) {
            setMsgName("Name can not empty!");
            statusForm = false;
        }
        if (price < 0) {
            setMsgPrice("Price must be bigger than 0!")
            statusForm = false;
        }
        if (quantity < 0) {
            setMsgQuantity("Quantity must be bigger than 0!");
            statusForm = false;
        }
        if (createAt < currentDate) {
            setMsgCreateAt ("CreateAt can not be the day in the past!");
            statusForm = false;
        }

        return statusForm;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const newProduct = {
            id: id,
            name: name,
            cateId: cateId,
            price: price,
            quantity: quantity,
            description:description,
            createAt: createAt,
            status: status,
            image:image
        }

        console.log("img"+image);

        if (validProduct(newProduct)) {
            

            fetch('http://localhost:9999/products', {
                method:"POST",
                body: JSON.stringify(newProduct),
                headers:{
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }
            ).then(res=>res.json())
            .then(result=>{
                if(result){
                    alert(`${result.name} create success!`);
                    navigate('/');
                }
            })
        }
        

        

    }

    // const handleImage = (e) => {
    //     setI
    // }
    return (
        <Container>
            <Row>
                <Col >
                    <a href='/' style={{ float: 'right', fontSize: '20px' }}>Back to home</a>
                </Col>
            </Row>

            <Row style={{ borderRadius: '15px', border: 'solid 2px orange', marginTop: '30px' }}>
                <Col xs={12}>
                    <h3 style={{ textAlign: 'center', alignItems: 'center', color: 'blue' }}>Create new product</h3>
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='id'>
                            <Form.Label>Id(*)</Form.Label>
                            <Form.Control type='text' onChange={(e) => setId(e.target.value)} ></Form.Control>
                            <span style={{color:'red'}}>{msgId!=""?msgId:''}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Product name(*)</Form.Label>
                            <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
                            <span style={{color:'red'}}>{msgName!=""?msgName:''}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cateId">
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={cateId} onChange={(e) => setCateId(parseInt(e.target.value))}>
                                {categories?.map(c => (
                                    <option key={c.id} >{c.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price(VND)</Form.Label>
                            <Form.Control type="number" min={0} onChange={(e) => setPrice(parseInt(e.target.value))} />
                            <span style={{color:'red'}}>{msgPrice!=""?msgPrice:''}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" min={0} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                            <span style={{color:'red'}}>{msgQuanity!=""?msgQuanity:''}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" onChange={(e) => setDiscription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="createAt">
                            <Form.Label>createAt</Form.Label>
                            <Form.Control required type='date' onChange={(e) => setCreateAt(e.target.value)}></Form.Control>
                            <span style={{color:'red'}}>{msgCreateAt!=""?msgCreateAt:''}</span>
                        </Form.Group>



                        <Form.Group className="mb-3" controlId="status">
                            <Form.Check label="Status" onChange={(e) => setStatus(e.target.checked)}
                                 checked={status}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='file' onChange={handleImageChange} accept='assets/image/'>
                            </Form.Control>
                            
                        </Form.Group>

                        {image!=""?(
                            <div>
                                <Image src={`/assets/images/${image}`}style={{width:'200px'}}></Image>
                            </div>
                        ):<></>}

                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                
            </Row>
        </Container>
    )
}

export default CreateProduct