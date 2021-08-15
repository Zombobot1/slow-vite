export const GET = 'https://jsonplaceholder.typicode.com/todos/'

export function getData(id: string) {
  return fetch(GET + id).then((response) => response.json())
}
