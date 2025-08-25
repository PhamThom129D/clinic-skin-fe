import Header from "@/components/patient/dashboard/Header";
import Hero from "@/components/patient/dashboard/Hero";
import Offers from "@/components/patient/dashboard/Offers";
import DoctorTeam from "@/components/patient/dashboard/DoctorTeam";
import WhyChooseUs from "@/components/patient/dashboard/WhyChooseUs";
import Testimonials from "@/components/patient/dashboard/Testimonials";
import ContactBooking from "@/components/patient/dashboard/ContactBooking";
import Footer from "@/components/patient/dashboard/Footer";
import { Box } from "@mui/material";


export default function Page() {
  return (
    <main>
      {/* <Header /> */}
      <Hero />
      
      {/* Section có background */}
      <Box
        sx={{
          backgroundImage: `url("https://res.cloudinary.com/dgmrwe4eo/image/upload/v1756106511/test_Bg_naaz2k.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Offers />
        <DoctorTeam />
        <WhyChooseUs />
        <Testimonials />
        <ContactBooking />
      </Box>

      <Footer />
    </main>
  );
}

