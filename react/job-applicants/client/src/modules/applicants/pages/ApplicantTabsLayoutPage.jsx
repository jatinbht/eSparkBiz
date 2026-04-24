import { Outlet } from "react-router"

const ApplicantsLayoutPage = () => {
    return (
        <>
        {/* tabs */}
        Basic info
        Education
        Experience
        Technologies
        {/* tabs */}

        <Outlet />
        </>
    )
}

export default ApplicantsLayoutPage