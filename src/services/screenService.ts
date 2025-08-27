import axios from "axios";
import { Doctor, Offer, Testimonial } from "../types/screen";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  const response = await axios.get("http://localhost:1209/api/doctors/basic");
  return response.data;
};
export const fetchOffers = async (): Promise<Offer[]> => {
  const response = await axios.get("http://localhost:1209/api/offers");
  return response.data;
};
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const response = await axios.get("http://localhost:1209/api/testimonials");
  return response.data;
};
