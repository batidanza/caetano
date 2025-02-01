import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createCollection } from "../../../services/collectionAPI";
import LoadingSketch from "../../layout/LoadingSketch";
import CustomTextInput from "../FormComponents/CustomTextInput";

const CreateCollection = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const imageFile = watch("Image");
  const preview = imageFile?.[0] ? URL.createObjectURL(imageFile[0]) : null;

  const onSubmit = async (data) => {


    setIsLoading(true);
    try {
      const formDataToSubmit = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          formDataToSubmit.append(key, key === "Image" ? value[0] : value);
        }
      });

      const apiResponse = await createCollection(formDataToSubmit);
      if (apiResponse.success) {
        alert("Collection created");
      } else {
        console.error("Error creating collection:", apiResponse.error);
      }
    } catch (error) {
      console.error("Error creating collection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      setValue("Image", e.dataTransfer.files);
    }
  };

  return (
    <div className="my-container-form">
      {isLoading && (
        <div className="loading">
          <LoadingSketch />
        </div>
      )}
      <h3 className="form-title">CREATE COLLECTION</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="my-form-form">
        <div className="my-form-group-form">
          <label htmlFor="Name" className="my-label-form">
            COLLECTION NAME
          </label>
          <CustomTextInput register={register} name="Name" placeholder="NAME" />
        </div>

        <div className="my-form-group-form">
          <label htmlFor="Description" className="my-label-form">
            DESCRIPTION
          </label>
          <CustomTextInput
            register={register}
            name="Description"
            placeholder="DESCRIPTION"
          />
        </div>

        <label htmlFor="Image" className="my-label-form">
          IMAGE
        </label>
        <div
          className="my-form-group-form drop-zone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            id="fileInput"
            type="file"
            {...register("Image")}
            accept="image/*"
            style={{ display: "none" }}
          />
          {preview ? (
            <div style={{ position: "relative" }}>
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100px", height: "auto", margin: "5px" }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("Image", null);
                }}
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  background: "rgba(255, 0, 0, 0.8)",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                X
              </button>
            </div>
          ) : (
            <p>Drop an Image or click to select it</p>
          )}
        </div>

        <button type="submit" className="my-button-form">
          CREATE COLLECTION
        </button>
      </form>
    </div>
  );
};

export default CreateCollection;
