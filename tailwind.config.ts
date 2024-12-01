import daisyui from "daisyui";
import { Config, PluginAPI } from "tailwindcss/types/config";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            keyframes: {
                "mount-effect": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                bounceY: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(10px)" },
                },
            },
            animation: {
                mount: "0.5s ease-in-out mount-effect",
                bounceY: "bounceY 2s infinite",
            },
            scale: {
                "96": "0.96",
                "97": "0.97",
                "98": "0.98",
                "99": "0.99",
                "101": "1.01",
                "102": "1.02",
                "103": "1.03",
                "104": "1.04",
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "white", // name of one of the included themes for dark mode
        base: false, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
};
export default config;
