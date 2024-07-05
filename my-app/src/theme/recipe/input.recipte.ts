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
            search: {
                outline: "0",
                width: "100%",
                maxWidth: "30rem",
                height: "2rem",
                background: "white",
                padding: "0 1.6rem",
                borderRadius: "0.7rem",
                appearance: "none",
                transition: " all .3s cubic-bezier(0, 0, 0.43, 1.49)",
                transitionProperty: "width, border-radius",
                zIndex: "1",
                position: "relative",
            }

        }


    },

})