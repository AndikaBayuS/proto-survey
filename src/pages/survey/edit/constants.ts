import { v4 as uuidv4 } from 'uuid';

export const buttonAttributes = [
  { label: "Teks", type: "text" },
  { label: "Checkbox", type: "checkbox", options: [{ id: uuidv4(), value: "" }] },
  {
    label: "Pilihan Ganda",
    type: "radio",
    options: [{ id: uuidv4(), value: "" }],
  },
];
