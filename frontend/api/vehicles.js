import axios from 'axios';

const instance = axios.create(
  {
    baseURL: ''
  });

function fetch() {
  return axios.get('http://localhost:3000/vehicles/');
}
function post(vehicle) {
  console.log({
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year
  })
  return instance.post('http://localhost:3000/vehicles/',
    {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year
    });
}
function remove(id) {
  return instance.delete(`http://localhost:3000/vehicles/${id}`);
}

export default { fetch, post, remove }
