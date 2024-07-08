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
            },
            checkbox: {
                appearance: "none",
                backgroundColor: "#fff",
                margin: "0",
                color: 'danger',
                width: "1.15em",
                height: "1.15em",
                border: "0.1rem solid",
                borderColor: "danger",
                borderRadius: " 0.15em",
                transform: "translateY(-0.075em)",
                display: "grid",
                placeContent: "center",
                '&::before': {
                    content: "''",
                    width: "0.65em",
                    height: "0.65em",
                    transform: "scale(0)",
                    transition: "120ms transform ease-in-out",
                    boxShadow: "inset 1em 1em #E91E63",
                    backgroundColor: 'secondary',
                    clipPath: "polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)",
                    transformOrigin: "left top",
                },
                '&:checked::before': {
                    transform: "scale(1)"
                }
            }

        }


    },

})