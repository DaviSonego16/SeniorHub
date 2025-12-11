export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate"], // você pode adicionar "anime" se quiser criar um tema DaisyUI nomeado
  },
};
