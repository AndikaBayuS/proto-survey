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
  { name: "Agrikultur", value: "agrikultur" },
];

export const SURVEY_SUBCATEGORY = [
  { name: "Ilmu Kedokteran", value: "ilmu kedokteran" },
  { name: "Keperawatan", value: "keperawatan" },
  { name: "Farmasi", value: "farmasi" },
  { name: "Gizi", value: "gizi" },
  { name: "Biomedis", value: "biomedis" },
  { name: "Fisioterapi", value: "fisioterapi" },
  { name: "Kesehatan Masyarakat", value: "kesehatan masyarakat" },
  {
    name: "Agroteknologi/Agroekoteknologi",
    value: "agroteknologi/agroekoteknologi",
  },
  { name: "Agribisnis", value: "agribisnis" },
  { name: "Ilmu Tanah", value: "ilmu tanah" },
  {
    name: "Ilmu Hama dan Penyakit Tumbuhan",
    value: "ilmu hama dan penyakit tumbuhan",
  },
  { name: "Teknologi Hasil Pertanian", value: "teknologi hasil pertanian" },
  { name: "Peternakan", value: "peternakan" },
  { name: "Perikanan", value: "perikanan" },
  { name: "Kehutanan", value: "kehutanan" },
  { name: "Teknik Informatika", value: "teknik informatika" },
  { name: "Teknik Elektro", value: "teknik elektro" },
  { name: "Teknik Mesin", value: "teknik mesin" },
  { name: "Teknik Sipil", value: "teknik sipil" },
  { name: "Teknik Industri", value: "teknik industri" },
  { name: "Teknik Kimia", value: "teknik kimia" },
  { name: "Teknik Lingkungan", value: "teknik lingkungan" },
  { name: "Teknik Biomedis", value: "teknik biomedis" },
  { name: "Psikologi", value: "psikologi" },
  { name: "Sosiologi", value: "sosiologi" },
  { name: "Filsafat", value: "filsafat" },
  { name: "Manajemen", value: "manajemen" },
  { name: "Akuntansi", value: "akuntansi" },
  { name: "Ekonomi", value: "ekonomi" },
  { name: "Fisika", value: "fisika" },
  { name: "Kimia", value: "kimia" },
  { name: "Biologi", value: "biologi" },
  { name: "Desain Grafis", value: "desain grafis" },
  { name: "Desain Interior", value: "desain interior" },
  { name: "Seni Pertunjukan", value: "seni pertunjukan" },
];
