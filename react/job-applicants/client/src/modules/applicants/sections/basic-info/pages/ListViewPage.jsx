import { useLoaderData } from 'react-router';
import PageNavigation from '../../../components/PageNavigator';
import SearchBar from '../../../../../../../packages/ui/components/SearchBar';
import ApplicantList from '../components/ApplicantList';

const ListViewPage = () => {
    const {applicants, pagination} = useLoaderData()
    const pageCount = pagination.pageCount
    return (
        <>
            <SearchBar />
            <ApplicantList applicants={applicants} />
            <PageNavigation pageCount={pageCount} />
        </>
    );
};


export {ListViewPage}