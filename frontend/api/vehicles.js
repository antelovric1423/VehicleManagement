import axios from 'axios';

const instance = axios.create(
  {
    baseURL: ''
  });

function fetch() {
  return axios.get('http://localhost:3000/vehicles/');
}
function post(vehicle) {
  return instance.post('http://localhost:3000/vehicles/',
    {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year
    });
}
function put(vehicle) {
  return instance.put(`http://localhost:3000/vehicles/${vehicle.id}`,
    {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year
    });
}
function remove(id) {
  return instance.delete(`http://localhost:3000/vehicles/${id}`);
}

export default { fetch, post, put, remove }
