const USER = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "", // min 3 symbols
};

const USER_VALIDATION_RULES = {
  firstName: { required: true, type: "string" },
  lastName: { required: true, type: "string" },
  email: { required: true, type: "string", pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/ },
  phoneNumber: { required: true, type: "string", pattern: /^\+380\d{9}$/ },
  password: { required: true, type: "string", minLength: 3 },
};

export { USER, USER_VALIDATION_RULES };
