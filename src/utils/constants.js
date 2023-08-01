import { v4 as uuidv4 } from "uuid";

export const SURVEY_MODE = [
  { name: "Normal", value: "normal" },
  { name: "Anonim", value: "anonim" },
];

export const DEFAULT_OPTIONS_VALUE = [
  { id: uuidv4(), value: "" },
  { id: uuidv4(), value: "" },
];

export const BUTTON_ATTRIBUTES = [
  {
    label: "Teks",
    type: "text",
  },
  {
    label: "Checkbox",
    type: "checkbox",
    options: DEFAULT_OPTIONS_VALUE,
  },
  {
    label: "Pilihan Ganda",
    type: "radio",
    options: DEFAULT_OPTIONS_VALUE,
  },
];

export const SURVEY_CATEGORY = [
  { label: "Semua Kategori", value: "semua" },
  { label: "Pendidikan", value: "pendidikan" },
  { label: "Kesehatan", value: "kesehatan" },
  { label: "Pariwisata", value: "pariwisata" },
  { label: "Pertanian", value: "pertanian" },
  { label: "Teknologi", value: "teknologi" },
  { label: "Agrikultur", value: "agrikultur" },
];

export const SURVEY_SUBCATEGORY = [
  { label: "Ilmu Kedokteran", value: "ilmu kedokteran" },
  { label: "Keperawatan", value: "keperawatan" },
  { label: "Farmasi", value: "farmasi" },
  { label: "Gizi", value: "gizi" },
  { label: "Biomedis", value: "biomedis" },
  { label: "Fisioterapi", value: "fisioterapi" },
  { label: "Kesehatan Masyarakat", value: "kesehatan masyarakat" },
  {
    label: "Agroteknologi/Agroekoteknologi",
    value: "agroteknologi/agroekoteknologi",
  },
  { label: "Agribisnis", value: "agribisnis" },
  { label: "Ilmu Tanah", value: "ilmu tanah" },
  {
    label: "Ilmu Hama dan Penyakit Tumbuhan",
    value: "ilmu hama dan penyakit tumbuhan",
  },
  { label: "Teknologi Hasil Pertanian", value: "teknologi hasil pertanian" },
  { label: "Peternakan", value: "peternakan" },
  { label: "Perikanan", value: "perikanan" },
  { label: "Kehutanan", value: "kehutanan" },
  { label: "Teknik Informatika", value: "teknik informatika" },
  { label: "Teknik Elektro", value: "teknik elektro" },
  { label: "Teknik Mesin", value: "teknik mesin" },
  { label: "Teknik Sipil", value: "teknik sipil" },
  { label: "Teknik Industri", value: "teknik industri" },
  { label: "Teknik Kimia", value: "teknik kimia" },
  { label: "Teknik Lingkungan", value: "teknik lingkungan" },
  { label: "Teknik Biomedis", value: "teknik biomedis" },
  { label: "Psikologi", value: "psikologi" },
  { label: "Sosiologi", value: "sosiologi" },
  { label: "Filsafat", value: "filsafat" },
  { label: "Manajemen", value: "manajemen" },
  { label: "Akuntansi", value: "akuntansi" },
  { label: "Ekonomi", value: "ekonomi" },
  { label: "Fisika", value: "fisika" },
  { label: "Kimia", value: "kimia" },
  { label: "Biologi", value: "biologi" },
  { label: "Desain Grafis", value: "desain grafis" },
  { label: "Desain Interior", value: "desain interior" },
  { label: "Seni Pertunjukan", value: "seni pertunjukan" },
];
