import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from '../api';
import { Dog } from '../types';

type State = {
  allDogs: Dog[];
  isLoading: boolean;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    allDogs: [],
    isLoading: false,
  };

  refetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs().then((dogs) =>
      this.setState({ allDogs: dogs })
    );
  };
  componentDidMount(): void {
    this.refetchData();
  }

  render() {
    const { allDogs } = this.state;
    return (
      <div className="App" style={{ backgroundColor: 'goldenrod' }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection>
          <ClassDogs allDogs={allDogs} />
          <ClassCreateDogForm />
        </ClassSection>

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
