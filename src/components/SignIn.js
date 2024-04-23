import React, { useEffect, useState ,createContext ,useContext} from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';
import { useAuth } from './Authcontext';


export  default function SignIn() {

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember,setRemember] = useState();

    const auth = useAuth();

    
    const [msgLogin, setMsgLogin] = useState('');

    useEffect(()=>{
        if(localStorage.getItem('remember')){
            const account = JSON.parse(localStorage.getItem('remember'));
            setEmail(account?.email);
            setPassword(account?.password);
        }
    },[])
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await auth.login(email, password);
        
        if(success){
            navigate("/");
            
            if(remember){
                localStorage.setItem('remember',JSON.stringify({email:email,password:password}));
            }
            else{
                localStorage.removeItem('remember');
            }
        }
        else{
            setMsgLogin("Email or password is wrong");
        }
        // if(success){
            

        //     if (user.role == "admin"&&auth.user) {
        //             console.log("vo check role");
        //         navigate('/admin/products');
        //     }
        //     else if (user.role == "user"&&auth.user) {
        //         navigate('/');
                
        //     }
        // }
        
        
    }

    

    return (
        <Container>
        <Form onSubmit={handleSubmit} style={{width:'30%',margin:'0 auto'}}>
            <span style={{ color: 'red' }}>{msgLogin != "" ? msgLogin : ''}</span>
            <Form.Group className="mb-3" >
                <Form.Label>Email address(*)</Form.Label>
                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} value={email?email:''} />
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label>Password(*)</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}  value={password?password:''}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Check type="checkbox" label="Remenber"
                onChange={(e)=>setRemember(e.target.checked)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign In
            </Button>
        </Form>
        </Container>
    )
}

