import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://reminder-2999a-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
