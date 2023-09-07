import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

export class ClassApp extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection />

        {/* should be inside of the ClassSection component using react children */}
        <ClassDogs />
        <ClassCreateDogForm />
      </div>
    );
  }
}
