// import { useEffect, useState } from 'react';
import ApplicantItem from './.ApplicantItem';
import { useLoaderData } from 'react-router';
import type { BasicInfo } from '@job-applicants/schemas';

const ApplicantList = ({applicants}): BasicInfo => {
    // const [applicants, setApplicants] = useState([])
    // useEffect(() => {
    //     async function loadApplicantData() {
    //         try {
    //             const response = await fetch('/api/applicants');
    //             const data = await response.json();
    //             setApplicants(data);
    //         } catch (error) {
    //             // next(error) //forgot this works only in express lol
    //             console.log('error ', error);
    //         }
    //     }
    //     loadApplicantData();
    // }, []);

    // const applicants = useLoaderData() as Awaited<ReturnType<typeof loadApplicants>>; //this is better (React Router recommended)
    
    
    
    // const applicants = useLoaderData() as BasicInfo[] //don't use 'as'

    return (
        <div
            className="
                overflow-x-auto
                rounded-lg
                border
                border-gray-200
                bg-white
                shadow-sm

                dark:border-gray-700
                dark:bg-gray-900
            "
        >
            <table className="min-w-full text-sm">
                <thead   className="
                            bg-gray-50
                            text-left
                            text-xs
                            uppercase
                            tracking-wide
                            text-gray-500

                            dark:bg-gray-800
                            dark:text-gray-400"
                >
                    <tr>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Designation</th>
                        <th className="px-4 py-3 font-medium">Address</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Phone</th>
                        <th className="px-4 py-3 font-medium">City</th>
                        <th className="px-4 py-3 font-medium">State</th>
                        <th className="px-4 py-3 font-medium">Gender</th>
                        <th className="px-4 py-3 font-medium">Zip</th>
                        <th className="px-4 py-3 font-medium">Relationship</th>
                        <th className="px-4 py-3 font-medium">Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((a) => (
                        <ApplicantItem
                            key={a.id}
                            applicant={a}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantList;
