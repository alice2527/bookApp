import {defineRecipe} from '@pandacss/dev'

export const inputRecipe = defineRecipe({
    className: 'input',
    description: 'The styles for the input component',
    base: {},
    variants: {
        variant: {
            text: {
                appearance: "none",
                border: "none",
                outline: "none",
                borderBottom: ".2em solid",
                borderColor: "primary",
                background: "background",
                borderRadius: ".2em .2em 0 0",
                padding: ".4em",
            },

        }


    },

})