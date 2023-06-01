import axios from "axios";
//#region CONFIG
const ENDPOINT = "http://localhost:8000";
//#endregion
const getUserTickets = async (user) => {
  const response = await axios.get(`${ENDPOINT}/tickets`, {
    headers: {
        Authorization: `Bearer ${user.accessToken}`,
    },
  });
  return response.data;
};
export { getUserTickets };
