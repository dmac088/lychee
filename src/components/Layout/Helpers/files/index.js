
import { instance as axios } from "../api";

export function uploadFile(file) {
    axios.post(
      'https://localhost:8090/api/Product/Upload/', {
      file,
    })
      .then(response => response.json())
      .then(success => {
        // Do something with the successful response
      })
      .catch(error => console.log(error)
    );
  }