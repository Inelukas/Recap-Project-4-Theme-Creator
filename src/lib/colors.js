import { uid } from "uid";

export const colorThemeArray = [
  {
    id: uid(),
    name: "Default Theme",
    colors: [
      { id: "c1", role: "primary main", hex: "#ff4a11", contrast: "#FFFFFF" }, // Vibrant orange
      { id: "c2", role: "primary dark", hex: "#c73e0b", contrast: "#FFFFFF" }, // Darker shade of orange
      { id: "c3", role: "primary light", hex: "#ff7a3e", contrast: "#000000" }, // Lighter shade of orange
      { id: "c4", role: "secondary main", hex: "#5C6BC0", contrast: "#FFFFFF" }, // Indigo Blue
      { id: "c5", role: "secondary dark", hex: "#3949AB", contrast: "#FFFFFF" }, // Darker indigo blue
      {
        id: "c6",
        role: "secondary light",
        hex: "#9FA8DA",
        contrast: "#000000",
      }, // Lighter indigo blue
    ],
  },
  {
    id: uid(),
    name: "2nd Theme",
    colors: [
      {
        id: "t1",
        role: "background main",
        hex: "#252629",
        contrast: "#FFFFFF",
      }, // Dark charcoal
      {
        id: "t2",
        role: "background dark",
        hex: "#1b1d1f",
        contrast: "#FFFFFF",
      }, // Darker charcoal
      {
        id: "t3",
        role: "background light",
        hex: "#43464b",
        contrast: "#FFFFFF",
      }, // Lighter charcoal
    ],
  },
];
