import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database

  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((response) => response.json()),

  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: () => {},

  // should delete a dog from the database
  deleteDog: (id: number) => {
    fetch(`${baseUrl}/dogs/${id}`, { method: 'DELETE' })
      .then((response) => response.text())
      .then((result) => console.log(result));
  },
  updateDog: () => {},

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    fetch(`${baseUrl}/dogs/1`, { method: 'DELETE' })
      .then((response) => response.text())
      .then((result) => console.log(result));
  },
};
/*     console.log("dummy stuff");
 */
/* var requestOptions = {
  method: 'DELETE',
  redirect: 'follow'
};

fetch("http://localhost:3000/dogs/1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error)); */


/*   fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PATCH',
  body: JSON.stringify({
    title: 'foo',
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json)); */

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