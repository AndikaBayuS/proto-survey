import { v4 as uuidv4 } from "uuid";

const defaultOption = [
  { id: uuidv4(), value: "" },
  { id: uuidv4(), value: "" },
];

export const buttonAttributes = [
  { label: "Teks", type: "text" },
  {
    label: "Checkbox",
    type: "checkbox",
    options: defaultOption,
  },
  {
    label: "Pilihan Ganda",
    type: "radio",
    options: defaultOption,
  },
];

export const SURVEY_MODE = [
  { name: "Normal", value: "normal" },
  { name: "Anonim", value: "anonim" },
];

export const SURVEY_CATEGORY = [
  { name: "Pendidikan", value: "pendidikan", color: "gray" },
  { name: "Kesehatan", value: "kesehatan", color: "red" },
  { name: "Pariwisata", value: "pariwisata", color: "orange" },
  { name: "Pertanian", value: "pertanian", color: "yellow" },
  { name: "Teknologi", value: "teknologi", color: "green" },
];

export const SURVEY_SUBCATEGORY = [];
