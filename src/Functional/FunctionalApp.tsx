import { useState, useEffect } from 'react';

import { FunctionalCreateDogForm } from './FunctionalCreateDogForm';
import { FunctionalDogs } from './FunctionalDogs';
import { FunctionalSection } from './FunctionalSection';
import { Dog } from '../types';
import { Requests } from '../api';

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [favDogs, setFavDogs] = useState<Dog[]>([]);
  const [unFavDogs, setUnFavDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Requests.getAllDogs()
    .then((dogs) => {
      setAllDogs(dogs);
    });
  }, []);


  return (
    <div className="App" style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection>
        <FunctionalDogs allDogs={allDogs} />
        <FunctionalCreateDogForm />
      </FunctionalSection>
    </div>
  );
}
