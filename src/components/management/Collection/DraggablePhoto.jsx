import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { SlideshowLightbox } from "lightbox.js-react";

const ItemType = "PHOTO";

const DraggablePhoto = ({ photo, index, movePhoto, canDrag }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
    canDrag: () => canDrag,
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (canDrag && draggedItem.index !== index) {
        movePhoto(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div className="artwork-container">
      <div className="artwork">
        {canDrag ? (
          <img
            ref={(node) => ref(drop(node))}
            src={photo.Image}
            alt={`Photo ${photo.ID}`}
            className="artwork-image draggable"
          />
        ) : (
          <SlideshowLightbox className="custom-slideshow-lightbox">
            <img
              src={photo.Image}
              alt={`Photo ${photo.ID}`}
              className="artwork-image"
            />
          </SlideshowLightbox>
        )}
      </div>
    </div>
  );
};

export default DraggablePhoto;
