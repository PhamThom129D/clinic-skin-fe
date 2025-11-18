"use client";
import React from "react";

import { notifySuccess } from "@/utils/toast";
import { BookingData } from "@/types/screen";
import { registerAppointment } from "@/services/bookingService";
import BookingForm from "@/components/forms/BookingForm";
import { Diversity1 } from "@mui/icons-material";

interface BookingFormStaffProps {
  darkMode?: boolean;
  onCompleted?: () => void;
}

const BookingFormStaff: React.FC<BookingFormStaffProps> = ({
  darkMode = false,
  onCompleted,
}) => {
  const handleSubmit = async (data: BookingData) => {
    try {
      await registerAppointment(data);
      notifySuccess("✅ Nhân viên đã tạo lịch khám thành công!");
      onCompleted?.();
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <> 
    <br></br>
           <BookingForm
    isStaff={true}
      darkMode={darkMode}
      onSubmit={handleSubmit}
    />
       </>
 

  );
};

export default BookingFormStaff;
