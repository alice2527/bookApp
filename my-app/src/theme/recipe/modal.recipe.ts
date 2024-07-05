import {defineRecipe} from '@pandacss/dev'

export const modalRecipe = defineRecipe({
    className: 'modal',
    description: 'The styles for the modal component',
    base: {},
    variants: {
        variant: {
            overlay: {
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1000",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                maxWidth: "600px",
                width: "90%",
                display: "flex",
                flexDirection: "column",
            },

            header: {
                display: "flex",
                justifyContent: " space-between",
                alignItems: "center",
                marginBottom: "1rem",
            },
            details: {
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            },
            footer: {
                display: "flex",
                justifyContent: "flex-end",
                marginTop: " 1rem",
            }

        }


    },

})