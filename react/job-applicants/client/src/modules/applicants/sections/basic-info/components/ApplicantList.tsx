// import { useEffect, useState } from 'react';
import ApplicantItem from './ApplicantItem';
import { useLoaderData } from 'react-router';

const ApplicantList = () => {
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

    const applicants = useLoaderData()

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Gender</th>
                    <th>Zip</th>
                    <th>Relationship</th>
                    <th>Date of Birth</th>
                </tr>
            </thead>
            <tbody>
                {applicants.map((a) => (
                    <ApplicantItem
                        key={a.id + a.fist_name + a.last_name}
                        applicant={a}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ApplicantList;
