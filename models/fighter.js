const FIGHTER = {
  id: "",
  name: "",
  health: 85,
  power: 0,
  defense: 1, // 1 to 10
};

const FIGHTER_VALIDATION_RULES = {
  name: { required: true, type: "string" },
  health: { required: false, type: "number", min: 80, max: 120 },
  power: { required: true, type: "number", min: 1, max: 100 },
  defense: { required: true, type: "number", min: 1, max: 10 },
};

export { FIGHTER, FIGHTER_VALIDATION_RULES };
