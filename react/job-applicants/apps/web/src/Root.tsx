import { Outlet } from "react-router";
import { Header, Footer } from '@job-applicants/ui';

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