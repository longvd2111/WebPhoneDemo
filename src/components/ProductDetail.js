import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container,Image } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";


function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState({});
    useEffect(() => {
        fetch(`http://localhost:9999/products/${id}`)
            .then(res => res.json())
            .then(result => setProduct(result));

        fetch(`http://localhost:9999/categories`)
            .then(res => res.json())
            .then(result => setCategories(result));
    }, [])


    return (
        <Container fluid>
            <Row>
                <Col xs={6} md={4}>
                    <Image src={`/assets/images/${product.image}`} thumbnail />
                </Col>

                <Col>
                    <div>Product name: {product?.name}</div>
                    <div>Price: {product?.price}</div>
                    <div>Quantity: {product?.quantity}</div>
                    <div>Description: {product?.description}</div>
                    <div>Create at: {product?.createAt}</div>
                    <div>Status: {product?.status == true ? 'In stock' : 'Out stock'}</div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductDetail