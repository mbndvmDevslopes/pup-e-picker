import { Component } from 'react';
import { dogPictures } from '../dog-pictures';
import { Dog } from '../types';

type State = {
  dogObj: Omit<Dog, 'id'>;
};
type CreateDogFormProps = {
  createDog: (dogObj: Omit<Dog, 'id'>) => void;
  isLoading: boolean;
};

export class ClassCreateDogForm extends Component<CreateDogFormProps> {
  defaultSelectedImage = dogPictures.BlueHeeler;

  state: State = {
    dogObj: {
      name: '',
      description: '',
      isFavorite: false,
      image: this.defaultSelectedImage,
    },
  };

  resetForm = () => {
    this.setState({
      dogObj: {
        name: '',
        description: '',
        image: this.defaultSelectedImage,
        isFavorite: false,
      },
    });
  };

  handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    this.setState({
      dogObj: { ...this.state.dogObj, [e.target.name]: e.target.value },
    });
  };

  render() {
    const { dogObj } = this.state;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.props.createDog(dogObj);
          this.resetForm();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={dogObj.name}
          disabled={this.props.isLoading}
          name="name"
          required
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id=""
          cols={80}
          rows={10}
          onChange={this.handleInputChange}
          disabled={false}
          required
          value={dogObj.description}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          name="image"
          onChange={this.handleInputChange}
          disabled={this.props.isLoading}
          value={dogObj.image}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={this.props.isLoading} />
      </form>
    );
  }
}
