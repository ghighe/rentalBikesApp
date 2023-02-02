import axios from "axios";

//method and data will be inialized with default values
const fetchData = async (url, method = "GET", data = {}) => {
  try {
    //try catch block to catch any potential errors when we send the request
    const response = await axios({
      method,
      url,
      data
    });
    //if there is not error return the promise
    return response.data;
  } catch (error) {
    console.log(`Cannot ${method}. Error occured ${error}`);
    return error;
  }
};

export default fetchData;
