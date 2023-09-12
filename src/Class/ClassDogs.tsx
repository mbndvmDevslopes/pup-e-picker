import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server

type ClassDogsProps = {
  allDogs: Dog[];
  updateDog: (id: number, isFav: boolean) => void;
  deleteDog: (id: number) => void;
  isLoading: boolean;
  filteredDogs: Dog[];
};

export class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const { filteredDogs, deleteDog, updateDog, isLoading } = this.props;
    return (
      <>
        {filteredDogs.map((doggie) => (
          <DogCard
            dog={{ ...doggie }}
            key={doggie.id}
            onTrashIconClick={() => {
              deleteDog(doggie.id);
            }}
            onHeartClick={() => {
              updateDog(doggie.id, false);
              //update isFavorite to false
            }}
            onEmptyHeartClick={() => {
              //updateisFavorite to true
              updateDog(doggie.id, true);
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
