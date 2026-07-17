import { Outlet } from "react-router"
import Header from '../../../packages/ui/src/layout/Header';
import Footer from '../../../packages/ui/src/layout/Footer';

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