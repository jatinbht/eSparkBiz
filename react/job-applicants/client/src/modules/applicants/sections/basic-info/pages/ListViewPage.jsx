import PageNavigation from '../../../../../../../packages/ui/components/PageNavigator';
import SearchBar from '../../../../../../../packages/ui/components/SearchBar';
import ApplicantList from '../components/ApplicantList';

const ListViewPage = () => {
    return (
        <>
            <SearchBar />
            <ApplicantList />
            <PageNavigation />
        </>
    );
};


export {ListViewPage}