import { Nav, Table, Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams,Navigate, useNavigate } from "react-router-dom";

function ProductManage() {
    const navigate = useNavigate('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cateId, setCateId] = useState(0);
    const [search, setSearch] = useState("");
    const { cat_id } = useParams();

    const [show, setShow] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (pId) => {
        setProductIdToDelete(pId);
        setShow(true)
    };

    const handleDelete = () => {

        if (products.find(p => p.id = productIdToDelete)) {
            fetch(`http://localhost:9999/products/${productIdToDelete}`, {
                method: 'DELETE',
            });
            handleClose();
            fetch("http://localhost:9999/products")
                .then(res => res.json())
                .then(data => setProducts(data));
             
            navigate('/admin/products');    
            alert("You deleted product successful!");
        }

    };

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




    return (

        <Container>

            <Row>
                <Col xs={12} sm={3}>
                    <Form.Group>

                        <Form.Select aria-label="Default select example" onChange={(e) => setCateId(parseInt(e.target.value))}>
                            <option key={0} value={0}>Select All</option>
                            {

                                categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            }
                        </Form.Select>

                    </Form.Group>

                </Col>

                <Col xs={12} sm={9}>
                    <Form style={{ width: '100%' }} >
                        <Form.Group className='mb-3'>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name to search"
                                onChange={e => setSearch(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Col>



            </Row>



            <Row>
                <span >
                    <a className='btn btn-primary' href='/admin/product/create' style={{ float: "right" }}>Create new product</a>
                </span>
                <Col>
                    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td ><Link className='' style={{ textDecoration: 'none' }} to={`/product/${p.id}`}>{p.name}</Link></td>
                                            <td>{p.price}</td>
                                            <td>{p.quantity}</td>
                                            <td>{categories && categories.find(c => c.id == p.cateId)?.name}</td>
                                            <td>Status: {p?.status == true ? 'In stock' : 'Out stock'}</td>
                                            <td>
                                                <Link className='btn btn-success' to={`/admin/product/edit/${p.id}`}>Update</Link>{' '}

                                                <Button variant="danger" onClick={(e) => handleShow(p.id)}>
                                                    Delete
                                                </Button>


                                                <Modal show={show} onHide={(e) => handleClose(p.id)}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Delete product?</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are you sure you want to delete {p.name}</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="danger" onClick={handleDelete}>
                                                            Delete
                                                        </Button>
                                                        <Button variant="primary" onClick={handleClose}>
                                                            Cancel
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table>


                    </Container>

                </Col>
            </Row>
        </Container>

    )
}

export default ProductManage