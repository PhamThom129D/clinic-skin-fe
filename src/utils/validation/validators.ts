// Bắt buộc nhập
export const required = (message = "Không được để trống") => ({
  required: message,
});

// Email: kiểm tra định dạng email chuẩn
export const emailRule = {
  required: "Vui lòng nhập email",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Email không đúng định dạng (VD: example@gmail.com)",
  },
};

// Mật khẩu: ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số, ký tự đặc biệt
export const passwordRule = {
  required: "Vui lòng nhập mật khẩu",
  minLength: {
    value: 8,
    message: "Mật khẩu phải có ít nhất 8 ký tự",
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Mật khẩu phải gồm chữ hoa, chữ thường, số và ký tự đặc biệt (VD: Abc@1234)",
  },
};

// Xác nhận mật khẩu
export const confirmPasswordRule = {
  required: "Vui lòng xác nhận mật khẩu",
};

// Số điện thoại Việt Nam
export const phoneNumberRule = {
  required: "Vui lòng nhập số điện thoại",
  pattern: {
    value: /^(0[3|5|7|8|9])+([0-9]{8})$/,
    message: "Số điện thoại không hợp lệ (VD: 0912345678)",
  },
};

// Họ tên: chỉ chữ và khoảng trắng
export const fullNameRule = {
  required: "Vui lòng nhập họ tên",
  minLength: {
    value: 2,
    message: "Họ tên phải có ít nhất 2 ký tự",
  },
  pattern: {
    value: /^[a-zA-ZÀ-ỹ\s]{2,50}$/,
    message: "Họ tên không hợp lệ (không chứa số hoặc ký tự đặc biệt)",
  },
};

// CMND/Hộ chiếu: tối thiểu 6 ký tự
export const passportRule = {
  required: "Vui lòng nhập CMND/Hộ chiếu",
  pattern: {
    value: /^[A-Za-z0-9]{6,15}$/,
    message: "CMND/Hộ chiếu không hợp lệ",
  },
};

// Nghề nghiệp
export const occupationRule = {
  required: "Vui lòng nhập nghề nghiệp",
  pattern: {
    value: /^[a-zA-ZÀ-ỹ\s]*$/,
    message: "Nghề nghiệp không hợp lệ",
  },
};

// Địa chỉ
export const addressRule = {
  required: "Vui lòng nhập địa chỉ",
  minLength: {
    value: 5,
    message: "Địa chỉ phải có ít nhất 5 ký tự",
  },
};

// Ngày sinh
export const dateOfBirthRule = {
  required: "Vui lòng nhập ngày sinh",
};

// Ngày khám
export const appointmentDateRule = {
  required: "Vui lòng chọn ngày khám",
};

// Giờ khám
export const appointmentTimeRule = {
  required: "Vui lòng nhập giờ khám",
  pattern: {
    value: /^([01]\d|2[0-3]):([0-5]\d)$/,
    message: "Giờ khám không hợp lệ (VD: 08:30, 14:45)",
  },
};

// Gender
export const genderRule = {
  required: "Vui lòng chọn giới tính",
};

// DoctorId
export const doctorIdRule = {
  required: "Vui lòng chọn bác sĩ",
};
