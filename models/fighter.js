export const FIGHTER = {
  id: "",
  name: { required: true, type: "string" },
  health: { required: false, type: "number", min: 80, max: 120 },
  power: { required: true, type: "number", min: 1, max: 100 },
  defense: { required: true, type: "number", min: 1, max: 10 },
};
