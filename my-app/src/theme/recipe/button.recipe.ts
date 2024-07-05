import {defineRecipe} from '@pandacss/dev'

export const buttonRecipe = defineRecipe({
    className: 'button',
    description: 'The styles for the Button component',
    base: {
        display: 'flex',
        fontSize: "1rem",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
        border: "none",
        fontWeight: 'semi-bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    variants: {
        variant: {
            primary: {
                bg: {base: "secondary", _hover: "primary"},
                color: "white",

            },
            outlined: {
                paddingInline: "1rem",
                bg: {base: "white", _hover: "danger"},
                color: {base: "danger", _hover: "white"},
                borderColor: "danger",
                border: "2px solid",
            },
        }


    },

})