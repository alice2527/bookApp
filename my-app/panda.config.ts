import {defineConfig, defineGlobalStyles, defineTextStyles} from "@pandacss/dev";
import {buttonRecipe} from "./src/theme/recipe/button.recipe";

export const textStyles = defineTextStyles({
    body: {
        description: 'The body text style - used in paragraphs',
        value: {
            fontFamily: 'Inter',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '24',
            letterSpacing: '0',
            textDecoration: 'None',
            textTransform: 'None'
        },
        h1: {
            description: 'Heading 1 style',
            value: {
                fontFamily: 'Inter',
                fontWeight: '700',
                fontSize: '32px',
                lineHeight: '40px',
                letterSpacing: '-0.5px',
                textDecoration: 'none',
                textTransform: 'none'
            }
        }, h2: {
            description: 'Heading 2 style',
            value: {
                fontFamily: 'Inter',
                fontWeight: '700',
                fontSize: '28px',
                lineHeight: '36px',
                letterSpacing: '-0.25px',
                textDecoration: 'none',
                textTransform: 'none'
            }
        },
        h3: {
            description: 'Heading 3 style',
            value: {
                fontFamily: 'Inter',
                fontWeight: '700',
                fontSize: '24px',
                lineHeight: '32px',
                letterSpacing: '0',
                textDecoration: 'none',
                textTransform: 'none'
            }
        },
    }
})
const globalCss = defineGlobalStyles({
    'html, body': {
        height: "100%",
        margin: "5",
        backgroundColor: "background",

    }
})
export default defineConfig({
    preflight: true,

    theme: {
        extend: {
            textStyles,
            tokens: {
                colors: {
                    primary: {value: '#9A998C'},
                    secondary: {value: '#D4CDC3'},
                    background: {value: "#F8F4E3"},
                    danger: {value: "#6E0D25"}
                },
                fonts: {
                    body: {value: 'system-ui, sans-serif'}
                }
            },
            breakpoints: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
            recipes: {
                button: buttonRecipe
            }
        }
    },
    include: ['./src/**/*.{ts,tsx,js,jsx}', './pages/**/*.{ts,tsx,js,jsx}'],
    exclude: [],
    globalCss,

    outdir: 'styled-system',


})