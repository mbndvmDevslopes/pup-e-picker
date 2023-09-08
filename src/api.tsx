import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database

  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((response) => response.json()),

  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: async (dog:Omit<Dog, 'id'>) => {
    const response = await fetch(`${baseUrl}/dogs`, {
      method: 'POST',
      body: JSON.stringify(dog),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await response.json();
    return console.log(json); 
  }, 
 
  // should delete a dog from the database
  deleteDog: (id: number) => {
     return fetch(`${baseUrl}/dogs/${id}`, { method: 'DELETE' })
     .then((response) => {
    
      return response.text();
    })
      
  },
  updateDog: (id: number, isFav: boolean): Promise<Dog> => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isFavorite: isFav,
      }),
      headers: {
        'Content-type': 'application/json',
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
    fetch(`${baseUrl}/dogs/1`, { method: 'DELETE' })
      .then((response) => response.text())
      .then((result) => console.log(result));
  },
};
/*     console.log("dummy stuff");
 */

{/*   createNote: (note: Omit<Note, 'id'>) => {
    return fetch(`${BASE_URL}/notes`, {
      body: JSON.stringify(note),
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response) => response.json());
  },*/ }



/*   fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json)); */