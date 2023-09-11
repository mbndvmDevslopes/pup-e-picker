// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Dog, isCreateDogActive, isFavActive, isUnFavActive } from '../types';

type ClassSectionProps = {
  updateIsFavActive: (newState: isFavActive) => void;
  updateIsUnFavActive: (newState: isUnFavActive) => void;
  updateIsCreateDogActive: (newState: isCreateDogActive) => void;
  isFavActive: isFavActive;
  isUnFavActive: isUnFavActive;
  isCreateDogActive: isCreateDogActive;
  children: ReactNode;
  allDogs: Dog[];
  updateFilteredDogs: (newState: Dog[]) => void;
};

export class ClassSection extends Component<ClassSectionProps> {
  componentDidUpdate(prevProps: ClassSectionProps) {
    if (
      this.props.isFavActive !== prevProps.isFavActive ||
      this.props.isUnFavActive !== prevProps.isUnFavActive ||
      this.props.allDogs !== prevProps.allDogs
    ) {
      let displayedDogs = this.props.allDogs;

      if (this.props.isFavActive) {
        displayedDogs = this.props.allDogs.filter(
          (dog) => dog.isFavorite === true
        );
      } else if (this.props.isUnFavActive) {
        displayedDogs = this.props.allDogs.filter(
          (dog) => dog.isFavorite === false
        );
      }

      this.props.updateFilteredDogs(displayedDogs);
    }
  }

  render() {
    const {
      allDogs,
      isUnFavActive,
      isFavActive,
      isCreateDogActive,
      updateIsFavActive,
      updateIsUnFavActive,
      updateIsCreateDogActive,
    } = this.props;

    const unFavDogs = allDogs.filter((dog: Dog) => dog.isFavorite === false);
    const favDogs = allDogs.filter((dog: Dog) => dog.isFavorite === true);

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={'/functional'} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={isFavActive ? `selector active` : 'selector'}
              onClick={() => {
                updateIsFavActive(!isFavActive);

                updateIsUnFavActive(false);
                updateIsCreateDogActive(false);
              }}
            >
              favorited ({favDogs.length})
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={isUnFavActive ? 'selector active' : 'selector'}
              onClick={() => {
                updateIsUnFavActive(!isUnFavActive);
                updateIsFavActive(false);
                updateIsCreateDogActive(false);
              }}
            >
              unfavorited ( {unFavDogs.length})
            </div>
            <div
              className={isCreateDogActive ? `selector active` : 'selector'}
              onClick={() => {
                console.log(isCreateDogActive);
                updateIsCreateDogActive(!isCreateDogActive);
                updateIsFavActive(false);
                updateIsUnFavActive(false);
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
