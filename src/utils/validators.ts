// src/utils/validators.ts

// Bắt buộc nhập
export const required = (message = "Không được để trống") => ({
  required: message,
});

// Email: kiểm tra định dạng email chuẩn
export const emailRule = {
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
export const phoneRule = {
  pattern: {
    value: /^(0[3|5|7|8|9])+([0-9]{8})$/,
    message: "Số điện thoại không hợp lệ (VD: 0912345678)",
  },
};

// Họ tên: chỉ chữ và khoảng trắng
export const nameRule = {
  required: "Vui lòng nhập họ tên",
  pattern: {
    value: /^[a-zA-ZÀ-ỹ\s]{2,50}$/,
    message: "Họ tên không hợp lệ (không chứa số hoặc ký tự đặc biệt)",
  },
};
