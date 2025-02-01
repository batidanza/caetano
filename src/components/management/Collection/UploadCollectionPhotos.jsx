import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadPhoto } from "../../../services/photoAPI";
import { fetchCollection } from "../../../services/collectionAPI";
import LoadingSketch from "../../layout/LoadingSketch";
import CustomDropdown from "../FormComponents/CustomDropDown";
import CustomTextInput from "../FormComponents/CustomTextInput";

const UploadCollectionPhotos = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const selectedFiles = watch("selectedFiles", []);
  const previews = selectedFiles.length
    ? selectedFiles.map((file) => URL.createObjectURL(file))
    : [];

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await fetchCollection();
        if (data) {
          setCollections(data);
        } else {
          console.error("Error fetching collections: data is undefined");
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (!data.selectedFiles.length || !data.selectedCollection) {
        console.error("Missing files or collection selection");
        return;
      }

      for (const file of data.selectedFiles) {
        const formData = new FormData();
        formData.append("Image", file);
        formData.append("CollectionID", data.selectedCollection);
        formData.append("Name", data.photoName);

        const response = await uploadPhoto(formData);
        if (response.success) {
          console.log("Media uploaded successfully:", response.data);
        } else {
          console.error("Error uploading media:", response.error);
        }
      }

      alert("Media uploaded successfully");
      setValue("selectedFiles", []);
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("Error uploading media");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setValue("selectedFiles", files, { shouldValidate: true });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setValue("selectedFiles", Array.from(e.dataTransfer.files));
  };

  return (
    <div className="my-container-form">
      {isLoading && (
        <div className="loading">
          <LoadingSketch />
        </div>
      )}
      <h3 className="form-title">UPLOAD COLLECTION PHOTOS</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="my-form-form">
        <div className="my-form-group-form">
          <label className="my-label-form" htmlFor="Collection">
            COLLECTION
          </label>
          <CustomDropdown
            options={collections.map((collection) => ({
              value: collection.ID,
              label: collection.Name,
            }))}
            value={watch("selectedCollection")}
            onChange={(val) => setValue("selectedCollection", val)}
          />
        </div>
        <div className="my-form-group-form">
          <label className="my-label-form" htmlFor="photoName">
            PHOTO IDENTIFIER
          </label>
          <CustomTextInput
            register={register}
            name="photoName"
            placeholder="PHOTO NAME"
          />
        </div>
        <div
          className="my-form-group-form drop-zone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            {...register("selectedFiles", { validate: (files) => Array.isArray(files) })}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="preview-images">
            {previews.map((src, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  style={{ width: "100px", height: "auto", margin: "5px" }}
                />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="my-button-form">
          POST IMAGES FOR COLLECTION
        </button>
      </form>
    </div>
  );
};

export default UploadCollectionPhotos;