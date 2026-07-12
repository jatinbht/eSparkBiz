import { Outlet } from 'react-router';
import Header from '../components/Header';

const ApplicantsLayoutPage = () => {
    return (
        <>
            <div className="min-h-screen bg-background text-foreground">
                <Header />

                <main className="mx-auto max-w-7xl px-6 py-8">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default ApplicantsLayoutPage;
