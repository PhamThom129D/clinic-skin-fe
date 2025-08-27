import api from "../api/api";
import { Doctor, Offer, Testimonial } from "../types/screen";


export const getDoctorsBasic = () => {
  return api.get<Doctor[]>("/doctors/basic");
};


export const getOffers = () => {
  return api.get<Offer[]>("/offers");
};


export const getTestimonials = () => {
  return api.get<Testimonial[]>("/testimonials");
};
