import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPhotoByCollection,
  fetchCollectionById,
} from "../../services/collectionAPI";
import { initLightboxJS } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import "./Collection.css";
import LoadingSketch from "../layout/LoadingSketch";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { swapPhotoIds } from "../../services/photoAPI";
import { useAuth } from "../management/user/Login";
import DraggablePhoto from "../management/Collection/DraggablePhoto";

const Collection = () => {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(null);
  const { loggedIn } = useAuth();

  useEffect(() => {
    initLightboxJS("Insert your License Key here", "Insert plan type here");
  }, []);

  useEffect(() => {
    const fetchPhotosAndCollection = async () => {
      try {
        const [photoData, collectionData] = await Promise.all([
          getPhotoByCollection(id),
          fetchCollectionById(id),
        ]);

        const sortedPhotos = photoData.sort((a, b) => a.Position - b.Position);
        setPhotos(sortedPhotos);
        setCollection(collectionData);
      } catch (error) {
        setError("Error fetching data");
      }
    };

    fetchPhotosAndCollection();
  }, [id]);

  const movePhoto = async (fromIndex, toIndex) => {
    const updatedPhotos = [...photos];
    const [movedPhoto] = updatedPhotos.splice(fromIndex, 1);
    updatedPhotos.splice(toIndex, 0, movedPhoto);

    updatedPhotos.forEach((photo, index) => {
      photo.Position = index;
    });

    setPhotos(updatedPhotos);

    try {
      const response = await swapPhotoIds(
        updatedPhotos[fromIndex].ID,
        updatedPhotos[toIndex].ID
      );

      if (!response.success) {
        throw new Error(response.error);
      }
    } catch (error) {
      setError("Error swapping photo IDs");
      const revertedPhotos = [...updatedPhotos];
      const [revertedPhoto] = revertedPhotos.splice(toIndex, 1);
      revertedPhotos.splice(fromIndex, 0, revertedPhoto);
      setPhotos(revertedPhotos);
    }
  };

  if (!collection || !photos.length) return <LoadingSketch />;
  if (error) return <p>{error}</p>;

  return (
    <div className="collection-container">
      <br />
      <br />
      <div className="artworks">
        <div className="columns-container">
          {Array.from({ length: 2 }).map((_, columnIndex) => (
            <div className="column" key={columnIndex}>
              {photos
                .filter((_, index) => index % 2 === columnIndex)
                .map((photo) => (
                  <DraggablePhoto
                    key={photo.ID}
                    photo={photo}
                    index={photos.indexOf(photo)}
                    movePhoto={movePhoto}
                    canDrag={loggedIn}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default () => (
  <DndProvider backend={HTML5Backend}>
    <Collection />
  </DndProvider>
);
