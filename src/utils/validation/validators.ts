// validation/bookingRules.ts
type GetValues = () => {
  appointmentDate?: string; // "YYYY-MM-DD"
  appointmentTime?: string; // "HH:mm" hoặc "HH:mm:ss"
};

const pad = (n: number) => String(n).padStart(2, "0");

// YYYY-MM-DD theo local time (tránh lệch timezone)
export const todayStr = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};


const toDateOnly = (s: string) => {
  // s: "YYYY-MM-DD"
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1); // local date
};

const nowTimeHHmm = () => {
  const now = new Date();
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

const hhmmToMinutes = (t: string) => {
  // t: "HH:mm" hoặc "HH:mm:ss"
  const [h, m] = t.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

// ==== Các rule cơ bản (không phụ thuộc field khác) ====
export const required = (message = "Không được để trống") => ({
  required: message,
});

export const emailRule = {
  required: "Vui lòng nhập email",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Email không đúng định dạng (VD: example@gmail.com)",
  },
};

export const passwordRule = {
  required: "Vui lòng nhập mật khẩu",
  minLength: { value: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}\-_.])[A-Za-z\d@$!%*?&()[\]{}\-_.]{8,}$/,
    message:
      "Mật khẩu phải gồm chữ hoa, chữ thường, số và ký tự đặc biệt (VD: Abc@1234)",
  },
};

export const confirmPasswordRule = {
  required: "Vui lòng xác nhận mật khẩu",
};

export const phoneNumberRule = {
  required: "Vui lòng nhập số điện thoại",
  pattern: {
    value: /^(0[3|5|7|8|9])[0-9]{8}$/,
    message: "Số điện thoại không hợp lệ (VD: 0912345678)",
  },
};

export const fullNameRule = {
  required: "Vui lòng nhập họ tên",
  minLength: { value: 2, message: "Họ tên phải có ít nhất 2 ký tự" },
  pattern: {
    value: /^[a-zA-ZÀ-ỹ\s]{2,50}$/,
    message: "Họ tên không hợp lệ (không chứa số hoặc ký tự đặc biệt)",
  },
};

export const passportRule = {
  required: "Vui lòng nhập CMND/Hộ chiếu",
  pattern: {
    value: /^[A-Za-z0-9]{9,12}$/,
    message: "CMND/Hộ chiếu không hợp lệ",
  },
};

export const occupationRule = {
  required: "Vui lòng nhập nghề nghiệp",
  pattern: {
    value: /^[a-zA-ZÀ-ỹ\s]*$/,
    message: "Nghề nghiệp không hợp lệ",
  },
};

export const addressRule = {
  required: "Vui lòng nhập địa chỉ",
  minLength: { value: 5, message: "Địa chỉ phải có ít nhất 5 ký tự" },
};

export const genderRule = {
  required: "Vui lòng chọn giới tính"
};

export const doctorIdRule = {
  required: "Vui lòng chọn bác sĩ",
  validate: (v: number) => (!!v && Number(v) > 0) || "Vui lòng chọn bác sĩ",
};

// ==== Rule nâng cao có phụ thuộc ngày/giờ ====
export const dateOfBirthRule = {
  required: "Vui lòng nhập ngày sinh",
  validate: (v: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return "Ngày sinh không hợp lệ (YYYY-MM-DD)";
    const dob = toDateOnly(v);
    const today = toDateOnly(todayStr());
    return dob < today || "Ngày sinh phải trước hôm nay";
  },
};

// Tạo rule động để có thể dùng getValues() từ react-hook-form
export const createBookingRules = (getValues?: GetValues) => {
  const appointmentDateRule = {
    required: "Vui lòng chọn ngày khám",
    validate: (v: string) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v))
        return "Ngày khám không hợp lệ (YYYY-MM-DD)";
      const chosen = toDateOnly(v);
      const tdr = toDateOnly(todayStr());
      // chỉ cho phép ngày SAU hôm nay (>= ngày mai)
      return chosen >= tdr || `Ngày khám phải từ ${todayStr()} trở đi`;
    },
  };

  const appointmentTimeRule = {
    required: "Vui lòng nhập giờ khám",
    pattern: {
      value: /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
      message: "Giờ khám không hợp lệ (VD: 08:30 hoặc 14:45)",
    },
    validate: (t: string) => {
      if (!getValues) return true;

      const { appointmentDate } = getValues() || {};
      if (!appointmentDate) return "Vui lòng chọn ngày khám trước";

      const today = todayStr();
      if (appointmentDate === today) {
        const now = nowTimeHHmm();
        if (hhmmToMinutes(t) <= hhmmToMinutes(now)) {
          return `Giờ khám phải sau hiện tại (${now})`;
        }
      }
      return true;
    },
  };

  return { appointmentDateRule, appointmentTimeRule };
};
