// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, ActiveTab } from "../types";

type ClassSectionProps = {
  updateFilteredDogs: (newState: Dog[]) => void;
  children: ReactNode;
  allDogs: Dog[];
  activeTab: ActiveTab;
  updateActiveTab: (newState: ActiveTab) => void;
};

export class ClassSection extends Component<ClassSectionProps> {
  componentDidUpdate(prevProps: ClassSectionProps) {
    if (
      this.props.activeTab !== prevProps.activeTab ||
      this.props.allDogs !== prevProps.allDogs
    ) {
      let displayedDogs = this.props.allDogs;

      if (this.props.activeTab === "favorite-dogs") {
        displayedDogs = this.props.allDogs.filter(
          (dog) => dog.isFavorite === true
        );
      } else if (this.props.activeTab === "unfavorite-dogs") {
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

      activeTab,
      updateActiveTab,
    } = this.props;

    const unFavDogs = allDogs.filter((dog: Dog) => dog.isFavorite === false);
    const favDogs = allDogs.filter((dog: Dog) => dog.isFavorite === true);

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={
                activeTab === "favorite-dogs" ? `selector active` : "selector"
              }
              onClick={() => {
                activeTab === "favorite-dogs"
                  ? updateActiveTab("all-dogs")
                  : updateActiveTab("favorite-dogs");
              }}
            >
              favorited ({favDogs.length})
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={
                activeTab === "unfavorite-dogs" ? "selector active" : "selector"
              }
              onClick={() => {
                activeTab === "unfavorite-dogs"
                  ? updateActiveTab("all-dogs")
                  : updateActiveTab("unfavorite-dogs");
                console.log(activeTab);
              }}
            >
              unfavorited ( {unFavDogs.length})
            </div>
            <div
              className={
                activeTab === "create-dog-form" ? `selector active` : "selector"
              }
              onClick={() => {
                activeTab === "create-dog-form"
                  ? updateActiveTab("all-dogs")
                  : updateActiveTab("create-dog-form");
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
