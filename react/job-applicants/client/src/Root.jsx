import { Outlet } from "react-router"
import Header from "../../packages/ui/components/Header";
import Footer from "../../packages/ui/components/Footer";

const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>


    )
}

export default Root