import React, { useState } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import AppRouter from './router/router';
import api from './service/api';
import { login } from './service/users';
import { setCookie } from 'typescript-cookie';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = (username: string, password: string) => {
  //   if (username === 'admin' && password === 'admin') {
  //     setIsLoggedIn(true);
  //   }
  // };

  const handleLogin = async (email: string, password: string)=> {
    const {data: {token}, status} = await login(email, password);
    if(status === 200){
      setCookie("auth-token", token)
      setIsLoggedIn(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleToggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleToggleEditModal = () => {
    setIsEditModalOpen((prevState) => !prevState);
  };
  const handleToggleAddModal = (isOpen: boolean) => {
    setIsEditModalOpen(false);
  setIsModalOpen(isOpen);
  };



  return (
    <div className="App">
      <AppRouter
        isLoggedIn={isLoggedIn}
        isModalOpen={isModalOpen}
        isEditModalOpen={isEditModalOpen} 
        handleLogin={handleLogin}
        handleToggleModal={handleToggleModal}
        handleCloseModal={handleCloseModal}
        handleToggleEditModal={handleToggleEditModal} 
        handleCloseEditModal={handleCloseEditModal} 
        handleToggleAddModal={handleToggleAddModal}
      />
      <GlobalStyles />
    </div>
  );
};

export default App;
