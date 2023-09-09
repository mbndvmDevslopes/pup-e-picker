// you can use this type for react children if you so choose
import { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dog } from '../types';
import { dogPictures } from '../dog-pictures';
type FunctionalSectionProps = {
  setIsFavActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUnFavActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreateDogActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFavActive: boolean;
  isUnFavActive: boolean;
  isCreateDogActive: boolean;
  children: ReactNode;
  allDogs: Dog[];

  setFilteredDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
};

export const FunctionalSection: React.FC<FunctionalSectionProps> = ({
  children,
  setIsFavActive,
  isFavActive,
  isUnFavActive,
  isCreateDogActive,
  setIsUnFavActive,
  setIsCreateDogActive,
  allDogs,

  setFilteredDogs,
}: {
  children: ReactNode;

  setIsFavActive: React.Dispatch<React.SetStateAction<boolean>>;
  isFavActive: boolean;
  isUnFavActive: boolean;
  isCreateDogActive: boolean;
  setIsUnFavActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreateDogActive: React.Dispatch<React.SetStateAction<boolean>>;
  allDogs: Dog[];

  setFilteredDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
}) => {
  const unFavDogs = allDogs.filter((dog: Dog) => dog.isFavorite === false);
  const favDogs = allDogs.filter((dog: Dog) => dog.isFavorite === true);

  useEffect(() => {
    let displayedDogs = allDogs;

    if (isFavActive) {
      displayedDogs = allDogs.filter((dog) => dog.isFavorite === true);
    } else if (isUnFavActive) {
      displayedDogs = allDogs.filter((dog) => dog.isFavorite === false);
    }

    setFilteredDogs(displayedDogs);
  }, [isFavActive, isUnFavActive, allDogs]);

  /*  const setFilter: () => void = () => {
    if (isFavActive) {
      setFilteredDogs(favDogs);
    } else if (isUnFavActive) {
      setFilteredDogs(unFavDogs);
    } else {
      setFilteredDogs([]);
    }
  };
  /*  */

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={'/class'} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={isFavActive ? `selector active` : 'selector'}
            onClick={() => {
              setIsFavActive(!isFavActive);
              setIsUnFavActive(false);
              setIsCreateDogActive(false);
            }}
          >
            favorited ( {favDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={isUnFavActive ? 'selector active' : 'selector'}
            onClick={() => {
              setIsUnFavActive(!isUnFavActive);
              setIsFavActive(false);
              setIsCreateDogActive(false);
            }}
          >
            unfavorited ( {unFavDogs.length} )
          </div>
          <div
            className={isCreateDogActive ? `selector active` : 'selector'}
            onClick={() => {
              setIsCreateDogActive(!isCreateDogActive);
              setIsFavActive(false);
              setIsUnFavActive(false);
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
