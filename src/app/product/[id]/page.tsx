'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<[]>([])

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`${API_URL}/api/product/${id}`);
      setProduct(res.data.data);
    };
    getProduct();
  }, []);

  return <div className="w-7xl mx-auto"></div>;
};

export default Product;
