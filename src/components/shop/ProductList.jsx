import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products?.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id} className="product-card">
          <img src={product.image[0]} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <p>${product.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
