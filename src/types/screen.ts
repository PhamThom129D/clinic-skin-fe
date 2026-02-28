export interface Doctor {
  doctorId: number;
  fullName: string;
  specialty: string;
  avtPath: string;
}
export interface Offer {
  title: string;
  description: string;
  img: string;
}
export interface Testimonial {
  testimonialId: number;
  content: string;
  img: string;
  accountId: number;
  fullName: string;
}

export interface BookingData {
  fullName: string;
  email: string;
  phoneNumber: string;
  passportNumber: string;
  occupation: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  appointmentDate: string;
  appointmentTime: string;
  note: string;
}

