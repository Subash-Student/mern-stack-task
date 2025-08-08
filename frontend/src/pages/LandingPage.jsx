import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AuthModal from '../components/AuthModal';

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <Header onLoginClick={handleOpenAuthModal} />
      <Hero />
      <AuthModal open={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </>
  );
};

export default LandingPage;