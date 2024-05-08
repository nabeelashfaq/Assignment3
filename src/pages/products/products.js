import React, { useEffect, useState } from "react";

import Modal from "../../components/modal/modal";
import Form from "../../components/form/form";

import "./products.css";

function Products() {
  const [isModalShown, setIsModalShown] = useState(false);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const [initialProducts, setInitialProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const addProductHandler = () => {
    setProduct(null);
    setIsModalShown(true);
  };

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setProducts(data);
          setInitialProducts(data);
        });
    };
    getProducts();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      setProducts(initialProducts);
      return;
    }
    const newProducts = initialProducts.filter((product) => {
      return product.title.toLowerCase().includes(value.toLowerCase());
    });
    setProducts(newProducts);
  };

  const addProduct = (product) => {
    product.image = "https://i.pravatar.cc"; // its for coz api accept image url
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((prevProducts) => [
          ...prevProducts,
          { id: data.id, ...product },
        ]);
        setInitialProducts((prevProducts) => [
          ...prevProducts,
          { id: data.id, ...product },
        ]);
        setIsModalShown(false);
      });
  };

  const onUpdate = (product) => {
    const { id } = product;
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...product,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedProducts = products.map((newProduct) => {
          if (newProduct.id === id) {
            return { ...product, image: product.image, id: data.id };
          }
          return { ...newProduct };
        });
        setProducts(updatedProducts);
        setIsModalShown(false);
      });
  };

  const onDelete = (product) => {
    fetch(`https://fakestoreapi.com/products/${product.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const newProducts = [...initialProducts].filter((product) => {
          return product.id !== data.id;
        });
        setProducts(newProducts);
        setInitialProducts(newProducts);
      });
  };

  const onEdit = (product) => {
    setIsModalShown(true);
    setProduct(product);
  };

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <div className="container">
          <div className="title-wrapper">
            <h2>Products</h2>
            <div className="action-wrapper">
              <div>
                <button onClick={addProductHandler}>Add Product</button>
              </div>
              <div className="form-wrapper">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <input
                      value={value}
                      onChange={onChange}
                      type="text"
                      placeholder="Search products"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="card-wrapper">
            {products.map((product) => (
              <div className="card" key={product.id}>
                <div className="card-holder">
                  <div className="card-header">
                    <button onClick={() => onEdit(product)}>Edit</button>
                    <button onClick={() => onDelete(product)}>Delete</button>
                  </div>

                  <a to={`/products/${product.id}`}>
                    <span className="title">{product.title}</span>
                    <div className="image-wrapper">
                      <span
                        style={{ backgroundImage: `url(${product.image})` }}
                      ></span>
                    </div>
                    <span className="price">{product.price}$</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          {isModalShown && (
            <Modal onClose={() => setIsModalShown(false)}>
              <Form
                onSubmit={addProduct}
                selectedProduct={product}
                onUpdate={onUpdate}
              />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}

export default Products;
