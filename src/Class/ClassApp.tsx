import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { Dog, IsLoading, ActiveTab } from "../types";

import toast from "react-hot-toast";

type State = {
  allDogs: Dog[];
  isLoading: IsLoading;
  activeTab: ActiveTab;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    allDogs: [],
    isLoading: false,
    activeTab: "all-dogs",
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
    Requests.updateDog(id, isFav).then(() => {
      this.refetchData().finally(() => this.setState({ isLoading: false }));
    });
  };

  deleteDog = (id: number) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(id).then(() => {
      this.refetchData().finally(() => this.setState({ isLoading: false }));
    });
  };

  createDog = (dog: Omit<Dog, "id">) => {
    this.setState({ isLoading: true });
    return Requests.postDog(dog)
      .then(() => toast.success("A dog is created"))
      .then(() => this.refetchData())
      .finally(() => this.setState({ isLoading: false }));
  };

  updateActiveTab = (newState: ActiveTab) => {
    this.setState({ activeTab: newState });
  };
  render() {
    const { allDogs, isLoading, activeTab } = this.state;
    const filteredDogs = this.state.allDogs.filter((dog) => {
      switch (this.state.activeTab) {
        case "all-dogs":
          return true;
        case "favorite-dogs":
          return dog.isFavorite;
        case "unfavorite-dogs":
          return !dog.isFavorite;
        case "create-dog-form":
          return false;
      }
    });
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={allDogs}
          activeTab={activeTab}
          updateActiveTab={this.updateActiveTab}
        >
          {activeTab !== "create-dog-form" && (
            <ClassDogs
              allDogs={allDogs}
              deleteDog={this.deleteDog}
              updateDog={this.updateDog}
              isLoading={isLoading}
              filteredDogs={filteredDogs}
            />
          )}
          {activeTab === "create-dog-form" && (
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
