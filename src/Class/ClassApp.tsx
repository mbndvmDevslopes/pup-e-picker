import { Component } from 'react';
import { ClassSection } from './ClassSection';
import { ClassDogs } from './ClassDogs';
import { ClassCreateDogForm } from './ClassCreateDogForm';
import { Requests } from '../api';
import {
  Dog,
  isCreateDogActive,
  isLoading,
  isFavActive,
  isUnFavActive,
} from '../types';
import toast from 'react-hot-toast';

type State = {
  allDogs: Dog[];
  filteredDogs: Dog[];
  isLoading: isLoading;
  isFavActive: isFavActive;
  isUnFavActive: isUnFavActive;
  isCreateDogActive: isCreateDogActive;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    allDogs: [],
    isLoading: false,
    filteredDogs: [],
    isFavActive: false,
    isUnFavActive: false,
    isCreateDogActive: false,
  };

  refetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) => this.setState({ allDogs: dogs }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };
  componentDidMount(): void {
    this.refetchData();
  }
  updateDog = (id: number, isFav: boolean) => {
    this.setState({ isLoading: true });
    Requests.updateDog(id, isFav).finally(() => {
      this.refetchData();
    });
  };

  deleteDog = (id: number) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(id).finally(() => {
      this.refetchData();
    });
  };

  createDog = (dog: Omit<Dog, 'id'>) => {
    this.setState({ isLoading: true });
    Requests.postDog(dog)
      .finally(() => this.refetchData())
      .then(() => toast.success('A dog is created'));
  };

  updateIsFavActive = (newState: isFavActive) => {
    this.setState({ isFavActive: newState });
  };
  updateIsUnFavActive = (newState: isUnFavActive) => {
    this.setState({ isUnFavActive: newState });
  };
  updateIsCreateDogActive = (newState: isCreateDogActive) => {
    this.setState({ isCreateDogActive: newState });
  };
  updateFilteredDogs = (newState: Dog[]) => {
    this.setState({ filteredDogs: newState });
  };
  render() {
    const {
      allDogs,
      isFavActive,
      isUnFavActive,
      isCreateDogActive,
      isLoading,
      filteredDogs,
    } = this.state;
    return (
      <div className="App" style={{ backgroundColor: 'goldenrod' }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          updateIsFavActive={this.updateIsFavActive}
          updateIsUnFavActive={this.updateIsUnFavActive}
          updateIsCreateDogActive={this.updateIsCreateDogActive}
          isFavActive={isFavActive}
          isUnFavActive={isUnFavActive}
          isCreateDogActive={isCreateDogActive}
          allDogs={allDogs}
          updateFilteredDogs={this.updateFilteredDogs}
        >
          {!isCreateDogActive && (
            <ClassDogs
              allDogs={allDogs}
              deleteDog={this.deleteDog}
              updateDog={this.updateDog}
              isLoading={isLoading}
              filteredDogs={filteredDogs}
            />
          )}
          {isCreateDogActive && (
            <ClassCreateDogForm
              createDog={this.createDog}
              isLoading={isLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
