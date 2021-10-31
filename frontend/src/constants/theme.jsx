import { createTheme }  from "@material-ui/core"
import { primaryColor, neutralColor } from "./colors"

const theme = createTheme({
    palette:{
        primary:{
            main: primaryColor,
            contrastext: "black"
        },
        text:{
            primary: neutralColor
        }
    }
})

export default theme