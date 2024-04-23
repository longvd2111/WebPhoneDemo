import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);



export const  AuthProvider = ({children})=> {

    const [user, setUser] = useState(null);
    useEffect(() => {
        // Kiểm tra và thiết lập người dùng dựa trên localStorage khi AuthProvider được mount
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
        }
      }, []);

      const login = async (email, password) => {
        try {
            const response = await axios.get(`http://localhost:9999/users?email=${email}&password=${password}`);
            if (response.data.length > 0) {
                localStorage.setItem('user', JSON.stringify(response.data[0])); // Lưu trạng thái đăng nhập 
                setUser(response.data[0]); // Thiết lập người dùng đăng nhập hiện tại              
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('user'); // Xóa trạng thái đăng nhập
        setUser(null); // Xóa thông tin người dùng
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

