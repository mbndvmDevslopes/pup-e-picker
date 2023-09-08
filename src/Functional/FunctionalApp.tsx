import { useState, useEffect } from 'react';

import { FunctionalCreateDogForm } from './FunctionalCreateDogForm';
import { FunctionalDogs } from './FunctionalDogs';
import { FunctionalSection } from './FunctionalSection';
import { Dog } from '../types';
import { Requests } from '../api';
import toast from 'react-hot-toast';

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [favDogs, setFavDogs] = useState<Dog[]>([]);
  const [unFavDogs, setUnFavDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const refetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        setAllDogs(dogs);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    Requests.getAllDogs().then((dogs) => {
      setAllDogs(dogs);
    });
  }, []);

  /* const favoriteDogs = allDogs.filter((dog) => dog.isFavorite===true);
  setFavDogs(favoriteDogs)
  console.log(favDogs)
 */
  const updateDog = (id: number, isFav: boolean) => {
    setIsLoading(true);
    Requests.updateDog(id, isFav).finally(() => {
      refetchData();
    });
  };

  const deleteDog = (id: number) => {
    setIsLoading(true);
    Requests.deleteDog(id).finally(() => refetchData());
  };

  const createDog = (dog: Omit<Dog, 'id'>) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .finally(() => refetchData())
      .then(() => toast.success('A dog is created'));
  };

  return (
    <div className="App" style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection>
        <FunctionalDogs
          allDogs={allDogs}
          deleteDog={deleteDog}
          updateDog={updateDog}
          isLoading={isLoading}
        />
        <FunctionalCreateDogForm createDog={createDog} isLoading={isLoading} />
      </FunctionalSection>
    </div>
  );
}
