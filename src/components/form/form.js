import { useState } from "react";
import { useDropzone } from "react-dropzone";

import "react-dropzone/examples/theme.css";

const Form = ({ onSubmit, onUpdate, selectedProduct = null }) => {
  const [product, setProduct] = useState({
    title: selectedProduct?.title || "",
    description: selectedProduct?.description || "",
    price: selectedProduct?.price || 0,
  });

  const handleInputChange = (field) => {
    return (e) => {
      setProduct((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => {
    return <li key={file.path}>{file.path}</li>;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedProduct !== null
      ? onUpdate({
          ...product,
          image: selectedProduct.image,
          id: selectedProduct.id,
        })
      : onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={product?.title}
          onChange={handleInputChange("title")}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          name="price"
          type="text"
          placeholder="Enter Price"
          value={product?.price}
          onChange={handleInputChange("price")}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="textarea"
          name="description"
          placeholder="Enter Description"
          value={product?.description}
          onChange={handleInputChange("description")}
        />
      </div>
      <div>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        {files.length > 0 ? (
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        ) : null}
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
