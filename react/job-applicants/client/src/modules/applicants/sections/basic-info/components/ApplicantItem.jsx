const ApplicantItem = ({ applicant }) => {
    return (
            <tr className="
                border-b
                border-gray-200
                hover:bg-gray-50
            
                dark:border-gray-700
                dark:hover:bg-gray-800
            ">
                <td className="px-4 py-3">{applicant.first_name}</td>
                <td className="px-4 py-3">{applicant.designation}</td>
                <td className="px-4 py-3">{applicant.address}</td>
                <td className="px-4 py-3">{applicant.email}</td>
                <td className="px-4 py-3">{applicant.phone}</td>
                <td className="px-4 py-3">{applicant.city}</td>
                <td className="px-4 py-3">{applicant.state}</td>
                <td className="px-4 py-3">{applicant.gender}</td>
                <td className="px-4 py-3">{applicant.zip_code}</td>
                <td className="px-4 py-3">{applicant.relationship_status}</td>
                <td className="px-4 py-3">{applicant.dob?.toLocaleDateString()}</td>
            </tr>
    );
};

export default ApplicantItem;
