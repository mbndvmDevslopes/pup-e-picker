import { dogPictures } from '../dog-pictures';
import { Dog } from '../types';
import { useState } from 'react';

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  createDog,
  isLoading,
}: {
  createDog: (dog: Omit<Dog, 'id'>) => void;
  isLoading: boolean;
}) => {

  const [dogObj, setDogObj] = useState<Omit<Dog, 'id'>>({
    name: '',
    description: '',
    image: defaultSelectedImage,
    isFavorite: false,
  });
  const resetForm = () => {
    setDogObj({
      name: '',
      description: '',
      image: defaultSelectedImage,
      isFavorite: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDogObj({ ...dogObj, [e.target.name]: e.target.value });
  };
  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog(dogObj);
        resetForm();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        name="name"
        required
        value={dogObj.name}
        onChange={handleInputChange}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        onChange={handleInputChange}
        value={dogObj.description}
        name="description"
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        required
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        name="image"
        required
        value={dogObj.image}
        onChange={handleInputChange}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
