import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="absolute bottom-5 left-0 right-0 text-center text-white">

      <p>Made by Grace Ongchangco &mdash; {currentYear}</p>
    </footer>
  );
};

export default Footer;