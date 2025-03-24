import axios from "axios";

const url = "https://sizzles-new.vercel.app/";

export async function fetchProducts() {
  const products = await axios.get(`${url}/`);
}
