import { useState, useEffect } from "react";

import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { ActiveTab } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all-dogs");

  //because I want to be a "cool kid"... :)"
  const filteredDogs = allDogs.filter((dog) => {
    switch (activeTab) {
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

  const updateDog = (id: number, isFav: boolean) => {
    setIsLoading(true);
    Requests.updateDog(id, isFav).then(() => {
      refetchData().finally(() => setIsLoading(false));
    });
  };

  const deleteDog = (id: number) => {
    setIsLoading(true);
    Requests.deleteDog(id).then(() => {
      refetchData().finally(() => setIsLoading(false));
    });
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => refetchData())
      .then(() => toast.success("A dog is created"))

      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {activeTab !== "create-dog-form" && (
          <FunctionalDogs
            deleteDog={deleteDog}
            updateDog={updateDog}
            isLoading={isLoading}
            filteredDogs={filteredDogs}
          />
        )}
        {activeTab === "create-dog-form" && (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
