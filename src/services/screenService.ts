import api from "../api/api";
import { Doctor, Offer, Testimonial } from "../types/screen";


export const getDoctorsBasic = () => {
  return api.get<Doctor[]>("/doctors");
};


export const getOffers = () => {
  return api.get<Offer[]>("/screen-dashboard/offers");
};


export const getTestimonials = () => {
  return api.get<Testimonial[]>("/screen-dashboard/testimonials");
};
