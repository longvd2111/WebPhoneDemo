import { Container, Row, Col, Carousel, ListGroup, Nav, Navbar, } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./components/Authcontext";
import UpdateProduct from "./components/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct";
import CreateProduct from "./components/CreateProduct";
import Cart from "./components/Cart";
import { Children } from "react";
import Authenticator from "./components/Authenticator";
import ProductsView from "./components/ProductsView";
import ProductManage from "./components/ProductManage";
import Index from "./components/Index";
import VerifyOrder from "./components/VerifyOrder";

function App() {

  const ProtectedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
      if(user&&user.role.match("admin")){
        
        // neu ko phai admin, ve home
        return children;
  
      }
      else{
        return Navigate('/404');
      }
    
  }


  return (
    <AuthProvider>
      <BrowserRouter>

        <Container fluid>

          <Header></Header>
          <Container>
            <Row>
              <Routes>
                <Route path="/" element={<Index ></Index>} />
                <Route path="/products" element={<ProductsView></ProductsView>}></Route>
                <Route path="/product/:id" element={<ProductDetail></ProductDetail>}></Route>
                <Route path="/auth/sign-up" element={<SignUp></SignUp>}></Route>
                <Route path="/auth/sign-in" element={<SignIn></SignIn>}></Route>
                <Route path="/admin/products" element={<ProtectedRoute><ProductManage></ProductManage></ProtectedRoute>}></Route>
                <Route path="/admin/product/edit/:id" element={<UpdateProduct></UpdateProduct>}></Route>
                <Route path="/admin/product/delete/:id" element={<DeleteProduct></DeleteProduct>}></Route>
                <Route path="/admin/product/create" element={<CreateProduct></CreateProduct>}></Route>
                <Route path="/cart" element={<Cart></Cart>}></Route>
                <Route path="/cart/verifyOrder" element={<VerifyOrder></VerifyOrder>}></Route>
                <Route path="/404" element={<Authenticator/>}></Route>
              </Routes>
            </Row>
          </Container>
          <Footer></Footer>
        </Container>
      </BrowserRouter >
    </AuthProvider>
  );
}

export default App;
