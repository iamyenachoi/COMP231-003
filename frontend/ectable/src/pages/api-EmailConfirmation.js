import axios from "axios";

const emailConfirm = async (email) => {
  try {
    let response = await axios.post(`http://localhost:5500/emailConfirm`, email, {
      
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default emailConfirm;