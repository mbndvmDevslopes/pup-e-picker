// you can use this type for react children if you so choose
import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";
import { ActiveTab } from "../types";

type FunctionalSectionProps = {
  children: ReactNode;
  allDogs: Dog[];
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;

  setFilteredDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
};

export const FunctionalSection: React.FC<FunctionalSectionProps> = ({
  children,
  allDogs,
  activeTab,
  setActiveTab,
  setFilteredDogs,
}: {
  children: ReactNode;

  allDogs: Dog[];
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;

  setFilteredDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
}) => {
  const unFavDogs = allDogs.filter((dog: Dog) => dog.isFavorite === false);
  const favDogs = allDogs.filter((dog: Dog) => dog.isFavorite === true);

  useEffect(() => {
    let displayedDogs = allDogs;
    displayedDogs = allDogs.filter((dog) => {
      if (activeTab === "all-dogs") return true;
      if (activeTab === "favorite-dogs") return dog.isFavorite;
      if (activeTab === "unfavorite-dogs") return !dog.isFavorite;
    });
    setFilteredDogs(displayedDogs);
  }, [activeTab, allDogs]);

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={
              activeTab === "favorite-dogs" ? "selector active" : "selector"
            }
            onClick={() => {
              activeTab === "favorite-dogs"
                ? setActiveTab("all-dogs")
                : setActiveTab("favorite-dogs");
            }}
          >
            favorited ( {favDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={
              activeTab === "unfavorite-dogs" ? "selector active" : "selector"
            }
            onClick={() => {
              activeTab === "unfavorite-dogs"
                ? setActiveTab("all-dogs")
                : setActiveTab("unfavorite-dogs");
            }}
          >
            unfavorited ( {unFavDogs.length} )
          </div>
          <div
            className={
              activeTab === "create-dog-form" ? "selector active" : "selector"
            }
            onClick={() => {
              activeTab === "create-dog-form"
                ? setActiveTab("all-dogs")
                : setActiveTab("create-dog-form");
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
