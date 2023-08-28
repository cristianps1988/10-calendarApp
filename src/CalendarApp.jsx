import { BrowserRouter, HashRouter } from "react-router-dom"
import { AppRouter } from "./router"

export const CalendarApp = () => {
    return (
        <BrowserRouter>
            {/* <HashRouter> */}
            <AppRouter />
            {/* </HashRouter> */}
        </BrowserRouter>
    )
}