const ApplicantItem = ({ applicant }) => {
    return (
            <tr>
                <td>{applicant.first_name}</td>
                <td>{applicant.designation}</td>
                <td>{applicant.address}</td>
                <td>{applicant.email}</td>
                <td>{applicant.phone}</td>
                <td>{applicant.city}</td>
                <td>{applicant.state}</td>
                <td>{applicant.gender}</td>
                <td>{applicant.zip_code}</td>
                <td>{applicant.relationship_status}</td>
                <td>{applicant.dob?.toLocaleDateString()}</td>
            </tr>
    );
};

export default ApplicantItem;
