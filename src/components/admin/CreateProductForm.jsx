import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { post } from "../../services/apiClient";
import CustomTextInput from "../inputs/CustomTextInput";
import CustomDropdown from "../inputs/CustomDropDown";

import "./CreateProductForm.css";
import { useCategory } from "../../hooks/useApiCalls";
import LoadingSketch from "../../layout/LoadingSketch";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  category_id: yup.string().required("Category is required"),
  care: yup.string().required("Care instructions are required"),
  palette: yup.string().required("Palette is required"),
  size: yup.string().required("Size is required"),
  image: yup.mixed().required("Image is required"),
});

const CreateProductForm = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useCategory();

  const createArrayWithLabelAndValue = (arr, keyValue, keyLabel, keyLabel2) =>
    arr?.map((obj) => ({
      label: keyLabel2 ? `${obj[keyLabel]} - ${obj[keyLabel2]}` : obj[keyLabel],
      value: obj[keyValue],
    }));

  const categories = createArrayWithLabelAndValue(categoriesData, "id", "name");

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category_id", data.category_id);
      formData.append("care", data.care);
      formData.append("palette", data.palette);
      formData.append("size", data.size);


      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("image", selectedFiles[i]);
      }

      console.log("Product Data:", data);

      const response = await post("/products/create_product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response);

      if (response.success) {
        window.location.href = "/shop";
      }
      
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  if (isLoading || categoriesLoading) {
    return <LoadingSketch />; // 👈 Muestra el loading
  }

  return (
    <div className="app-basic-view-main-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="create-product-form-container"
      >
        <div className="create-product-inputs-group-container">
          <div className="create-product-inputs-row">
            <div className="create-product-input-pair">
              <CustomTextInput
                name="name"
                register={register}
                label="Product Name *"
                placeholder="Enter product name"
                error={errors.name}
              />
              {errors.name && (
                <p className="create-product-input-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="create-product-input-pair">
              <CustomTextInput
                name="description"
                register={register}
                label="Description *"
                placeholder="Enter product description"
                error={errors.description}
              />
              {errors.description && (
                <p className="create-product-input-error">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="create-product-input-pair">
              <CustomTextInput
                name="price"
                register={register}
                label="Price *"
                placeholder="Enter product price"
                error={errors.price}
                type="number"
              />
              {errors.price && (
                <p className="create-product-input-error">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div className="create-product-inputs-row">
            <div className="create-product-input-pair">
              Category
              <CustomDropdown
                name="category_id"
                options={categories}
                register={register}
                label="Category *"
                error={errors.category_id}
                control={control}
              />
              {errors.category_id && (
                <p className="create-product-input-error">
                  {errors.category_id.message}
                </p>
              )}
            </div>
            <div className="create-product-input-pair">
              <CustomTextInput
                name="care"
                register={register}
                label="Care Instructions *"
                placeholder="Enter care instructions"
                error={errors.care}
              />
              {errors.care && (
                <p className="create-product-input-error">
                  {errors.care.message}
                </p>
              )}
            </div>
            <div className="create-product-input-pair">
              <CustomTextInput
                name="palette"
                register={register}
                label="Palette *"
                placeholder="Enter palette"
                error={errors.palette}
              />
              {errors.palette && (
                <p className="create-product-input-error">
                  {errors.palette.message}
                </p>
              )}
            </div>{" "}
            <div className="create-product-input-pair">
              <CustomTextInput
                name="size"
                register={register}
                label="Size *"
                placeholder="Size"
                error={errors.palette}
              />
              {errors.palette && (
                <p className="create-product-input-error">
                  {errors.palette.message}
                </p>
              )}
            </div>
          </div>

          <div
            className="my-form-group-form"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <label className="my-label-form" htmlFor="Images">
              Images
            </label>
            <input
              {...register("image")}
              className="my-input-form"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                handlePhotoFileChange(e);
              }}
              style={{ display: "none" }}
            />

            <div
              className="drop-zone"
              onClick={(e) => {
                if (e.target.type !== "button") {
                  document.querySelector('input[type="file"]').click();
                }
              }}
            >
              <div className="preview-images" style={{ position: "relative" }}>
                {previews.map((src, index) => (
                  <div key={index} className="image-preview-container">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="drop-zone-image"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="remove-image-button"
                    >
                      X
                    </button>
                  </div>
                ))}
                {previews.length === 0 && (
                  <p>Drop images or click to select them</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="create-product-submit-button">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
