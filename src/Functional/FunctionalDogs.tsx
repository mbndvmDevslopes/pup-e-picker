import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  updateDog,
  deleteDog,
  isLoading,
  filteredDogs,
}: {
  updateDog: (id: number, isFav: boolean) => void;
  deleteDog: (id: number) => void;
  isLoading: boolean;
  filteredDogs: Dog[];
}) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {filteredDogs.map((doggie: Dog) => (
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
};
