import axios from "axios";

export const getPatients = async () => {
  const res = await axios.get("http://localhost:1209/api/visit-sessions/list-session-date");
  return res.data;
};
