export interface Doctor {
  doctorId: number;
  fullName: string;
  specialty: string;
  avtPath: string;
}
export interface Offer {
  title: string;
  desc: string;
  img: string;
}
export interface Testimonial {
  testimonialId: number;
  content: string;
  img: string;
  accountId: number;
  fullName: string;
}
