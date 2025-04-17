import React from "react";
import { useColorTheme } from "../../context/ColorThemeContext";
import { useProduct } from "../../hooks/useApiCalls";
import ProductList from "../../components/shop/ProductList";
import { colorPalettes } from "../../utils/colorPalletes";
import "./Shop.css";

const Shop = () => {
  const { theme, changeTheme } = useColorTheme();

  const { data: productsData, isLoading: productsLoading } = useProduct();

  const products = productsData?.filter((e) => e.palette == theme);

  return (
    <div className="shop-main-container">
      <div className="shop-color-buttons">
        {Object.entries(colorPalettes).map(([key, palette]) => {
          if (
            palette.colors &&
            Array.isArray(palette.colors) &&
            palette.colors.length > 0
          ) {
            return (
              <button
                key={key}
                onClick={() => changeTheme(key)}
                className={`color-button ${key}-button`}
              >
                <div
                  className="color-layer"
                  style={{ background: palette.colors[0] }}
                ></div>
                <div
                  className="color-layer"
                  style={{ background: palette.colors[1] }}
                ></div>
                <div
                  className="color-layer"
                  style={{ background: palette.colors[2] }}
                ></div>
              </button>
            );
          }
          return null; 
        })}
      </div>

      <ProductList products={products} />
    </div>
  );
};

export default Shop;
