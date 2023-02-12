/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#F09199",
    secondary: "#00AEEC",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    white: "#FFFFFF",
    black: "#000000",
  },
  //   colors: {
  //     background: "#FFFFFF",
  //     surface: "#FFFFFF",
  //     primary: "#6200EE",
  //     "primary-darken-1": "#3700B3",
  //     secondary: "#03DAC6",
  //     "secondary-darken-1": "#018786",
  //     error: "#B00020",
  //     info: "#2196F3",
  //     success: "#4CAF50",
  //     warning: "#FB8C00",
  //   },
};
const myCustomDarkTheme: ThemeDefinition = {
  dark: true,
  // colors: {
  //   background: "#FFFFFF",
  //   surface: "#FFFFFF",
  //   primary: "#F09199",
  //   secondary: "#02A3FB",
  //   error: "#B00020",
  //   info: "#2196F3",
  //   success: "#4CAF50",
  //   warning: "#FB8C00",
  // },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "myCustomLightTheme",
    variations: {
      colors: ["primary", "secondary"],
      lighten: 4,
      darken: 2,
    },
    themes: {
      myCustomLightTheme,
      myCustomDarkTheme,
    },
  },
});
