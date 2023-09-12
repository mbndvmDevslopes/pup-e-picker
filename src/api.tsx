import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database

  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((response) => response.json()),

  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  /*postDog: async (dog: Omit<Dog, 'id'>) => {
    const response = await fetch(`${baseUrl}/dogs`, {
      method: 'POST',
      body: JSON.stringify(dog),
      headers: {
        'Content-type': 'application/json',
      },
    });
     const json = await response.json();
  },*/
  postDog: (dog: Omit<Dog, "id">) => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      body: JSON.stringify(dog),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  },

  // should delete a dog from the database
  deleteDog: (id: number) => {
    return fetch(`${baseUrl}/dogs/${id}`, { method: "DELETE" }).then(
      (response) => {
        return response.text();
      }
    );
  },
  updateDog: (id: number, isFav: boolean): Promise<Dog> => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isFavorite: isFav,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((updatedDog) => {
        return updatedDog;
      });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    fetch(`${baseUrl}/dogs/1`, { method: "DELETE" })
      .then((response) => response.text())
      .then((result) => console.log(result));
  },
};
/*     console.log("dummy stuff");
 */
