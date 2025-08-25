import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Offers from "@/components/Offers";
import DoctorTeam from "@/components/DoctorTeam";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ContactBooking from "@/components/ContactBooking";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Offers />
      <DoctorTeam />
      <WhyChooseUs />
      <Testimonials />
      <ContactBooking />
    </main>
  );
}
