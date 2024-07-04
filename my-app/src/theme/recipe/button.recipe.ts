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
        color: "white",
    },
    variants: {
        variant: {
            closeButton: {
                bg: 'secondary',

            },
            outlined: {
                paddingInline: "1rem",
                bg: "white",
                color: "danger",
                borderColor: "danger",
                border: "2px solid",
                borderRadius: "4px",
                fontWeight: 'semi-bold',
            }
        }


    },

})