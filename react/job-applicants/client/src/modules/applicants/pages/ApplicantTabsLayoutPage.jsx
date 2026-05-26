import { Outlet } from 'react-router';
import Header from '../components/Header';

const ApplicantsLayoutPage = () => {
    return (
        <>
            <div
                className="
                    min-h-screen
                    overflow-x-hidden

                    bg-white
                    text-black

                    dark:bg-gray-800
                    dark:text-white
                "
            >
                <Header />
                <Outlet />
            </div>
        </>
    );
};

export default ApplicantsLayoutPage;
