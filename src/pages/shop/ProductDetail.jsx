import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";
import { useProduct } from "../../hooks/useApiCalls";
import "./ProductDetail.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { colorPalettes } from "../../utils/colorPalletes";
import { useColorTheme } from "../../context/ColorThemeContext";


const Product = () => {
  const { id } = useParams();
  const { data: productsData, isLoading } = useProduct();
  const product = productsData?.find((p) => p.id.toString() === id);

  const { theme } = useColorTheme();
  const selectedColors = colorPalettes[theme]?.colors;


  return (
    <div className="product-detail-main-container">
      <div className="product-detail-media-container">
        <div className="product-detail-media-gallery">
          {isLoading ? (
            <div className="product-detail-skeleton-row">
              <Skeleton
                baseColor={selectedColors[3]}
                highlightColor={selectedColors[1]}
                height="90vh"
                width="550px"
              />
              <Skeleton
                baseColor={selectedColors[3]}
                highlightColor={selectedColors[1]}
                height="90vh"
                width="550px"
              />
              <Skeleton
                baseColor={selectedColors[3]}
                highlightColor={selectedColors[1]}
                height="90vh"
                width="550px"
              />
            </div>
          ) : (
            <>
              {product?.image.map((image, index) => (
                <div className="product-detail-image-carrousell" key={index}>
                  <img
                    src={image}
                    alt={`Media ${index}`}
                    className="product-detail-image-carrousell-photo"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="product-detail-product-info-content">
        <div className="product-detail-info-container-start">
          <p className="product-detail-product-title">
            {product?.name} / ${product?.price},00
          </p>
        </div>
        <div className="product-detail-info-container-center">
          <p>{product?.size}</p>
        </div>
        <div className="product-detail-info-container-end">
          <button className="product-detail-add-to-cart">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
