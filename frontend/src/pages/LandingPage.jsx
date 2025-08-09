import React, { useState } from 'react';
import Header from '../components/Header'; // Top navigation/header bar
import Hero from '../components/Hero'; // Main landing page hero section
import AuthModal from '../components/AuthModal'; // Login/Register modal

const LandingPage = () => {
  // State to control the open/close status of the auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Function to open the Auth Modal (triggered when Login button is clicked)
  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  // Function to close the Auth Modal (triggered when modal close button is clicked)
  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      {/* Pass down a click handler to Header so it can open the auth modal */}
      <Header onLoginClick={handleOpenAuthModal} />

      {/* Main landing page hero section */}
      <Hero />

      {/* Authentication modal, controlled via state */}
      <AuthModal 
        open={isAuthModalOpen} // true = visible, false = hidden
        onClose={handleCloseAuthModal} // closes the modal
      />
    </>
  );
};

export default LandingPage;
