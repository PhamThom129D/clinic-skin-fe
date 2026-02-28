import { Session } from "@/types/session";
import axios from "axios";

export const getPatients = async () => {
  const res = await axios.get("http://localhost:1209/api/visit-sessions/list-session-date");
  return res.data;
};
export const getSessionsByDate = async (date: string): Promise<Session[]> => {
  const res = await axios.get(`/api/visit-sessions/list-session-date`, {
    params: { date },
  });
  return res.data;
};



