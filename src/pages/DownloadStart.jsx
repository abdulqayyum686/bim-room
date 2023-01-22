import React from 'react';

import Navbar from "../components/Navbar";

import Loader from '../components/Loader';
import Footer from "../components/Footer";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wait } from '../utils/wait';

const DownloadStart = () => {
  const navigate = useNavigate();
  
  useEffect(async () => {
    const downloading = JSON.parse(localStorage.getItem('downloading'));
    if (downloading === 'false') {
      console.log(downloading);
      localStorage.setItem('downloading', 'true');
      window.location.reload();
    } else {
      await wait(5000);
      navigate("/");
    }
  },[])

  return (
    <>
      <Navbar />
      <Loader text={"Downloading object"}/>
      <Footer />
    </>
  );
};

export default DownloadStart;