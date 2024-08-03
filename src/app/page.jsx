"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const HomePage = () => {

  const router = useRouter()
  const [name, setName] = useState('');

  return (
    <>
    hello world
    </>
  );
};

export default HomePage;
