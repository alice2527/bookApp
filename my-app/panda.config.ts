import {defineConfig, defineGlobalStyles, defineTextStyles} from "@pandacss/dev";
import {buttonRecipe} from "./src/theme/recipe/button.recipe";
import {inputRecipe} from "./src/theme/recipe/input.recipte";
import {modalRecipe} from "./src/theme/recipe/modal.recipe";

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
        title: {
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
        }, subHeading: {
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
        heading3: {
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
        marginInline: {xs: "0.5rem", sm: "1rem", md: "2rem"},
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
                xs: '348',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
            recipes: {
                button: buttonRecipe,
                input: inputRecipe,
                modal: modalRecipe
            }
        }
    },
    include: ['./src/**/*.{ts,tsx,js,jsx}', './pages/**/*.{ts,tsx,js,jsx}'],
    exclude: [],
    globalCss,

    outdir: 'styled-system',


})