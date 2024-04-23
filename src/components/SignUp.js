import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Ratio } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [id,setId] = useState('');
    const [phone,setPhone] = useState(null);
    const [address,setAddress] = useState('');
    const [users,setUsers] = useState([]);

    const [msgEmail,setMsgEmail] = useState('');
    const [msgPassword,setMsgPassword] = useState('');
    const [msgPhone,setMsgPhone] = useState('');

    const navigate = useNavigate();


    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phoneRegex = /^\d{10}$/;
    const isDuplicateId = (id, existingIds) => {
        return existingIds.includes(id);
    }

    // Hàm tạo ID ngẫu nhiên với định dạng UXXX
    const generateUniqueId = () => {
        const prefix = 'U';
        const min = 1;
        const max = 999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return prefix + randomNumber;
    }

    const createUniqueUserId = (existingIds) => {
        let newId = generateUniqueId();
        while (isDuplicateId(newId, existingIds)) {
            newId = generateUniqueId();
        }
        return newId;
    }

    useEffect(() => {       
        fetch('http://localhost:9999/users')
            .then(res => res.json())
            .then(result => { setUsers(result) });
    }, []);


    const validUser = (newUser) => {   
        let valid = true;     
        if(email.length==0){
            setMsgEmail("Email can not empty!");
            valid = false;
        }
        if(!email.match(emailRegex)){
            setMsgEmail("Wrong format, the format must be username@gmail.com! Ex: abc@gmail.com");
            valid = false;
        }
        for (let index = 0; index < users.length; index++) {
            if(users[index].email==email){
                setMsgEmail("Email existed!");
                valid = false;
                break;
            }
        }
        if(password.length<8){
            setMsgPassword("Password must have at least 8 characters!");
            valid = false;
        }

        if(!phone.match(phoneRegex)){
            setMsgPhone("Phone number must contain 10 numbers!");
            valid = false;
        }

        return valid;
    }

    const userIds = users.map(user=>user.id);
    const handleSubmit =(e) =>{
        e.preventDefault();
        const newUser={
            id:createUniqueUserId(userIds),
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
            gender:gender,
            dob:dob,
            role:"user",
            phone:phone,
            address:address
        }

        if(validUser(newUser)){

            fetch('http://localhost:9999/users', {
                method:"POST",
                body: JSON.stringify(newUser),
                headers:{
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(res=>res.json())
            .then(result=>{
                if(result){
                    alert(`${result.email} create success!`);
                    navigate('/');
                }
            })
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" c>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"  onChange={(e) => setEmail(e.target.value)} />
                <span style={{color:'red'}}>{msgEmail!=""?msgEmail:''}</span>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"  onChange={(e) => setPassword(e.target.value)} />
                <span style={{color:'red'}}>{msgPassword!=""?msgPassword:''}</span>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>FirstName</Form.Label>
                <Form.Control type="text"  onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>LastName</Form.Label>
                <Form.Control type="text"  onChange={(e) => setLastName(e.target.value)} />            
            </Form.Group>    

            <Form.Group className="mb-3" >
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number"  onChange={(e) => setPhone(e.target.value)} />
                <span style={{color:'red'}}>{msgPhone!=""?msgPhone:''}</span>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>createAt</Form.Label>
                <Form.Control  type='date' onChange={(e) => setDob(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Gender</Form.Label>
                <br></br>
                <Form.Check
                    inline
                    label="Male"
                    name="group1"
                    type='radio'
                    value={'male'}
                    onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                    inline
                    label="Female"
                    name="group1"
                    type='radio'
                    value={'female'}
                    onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                    inline
                    label="Other"
                    type='radio'
                    value={'other'}
                    onChange={(e) => setGender(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>address</Form.Label>
                <Form.Control type="text"  onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

