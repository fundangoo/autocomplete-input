import { JSONObject } from '../types/json.type';

export const fetchData = async (dataSource: string): Promise<any> => {
  return fetch(dataSource)
    .then((response) => {
      return response.ok
        ? Promise.resolve(response)
        : Promise.reject(`Failed to load data from ${dataSource}`);
    })
    .then((response) => response.json())
    .then((response) => response as JSONObject);
};
