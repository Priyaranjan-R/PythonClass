import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/products/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Products;