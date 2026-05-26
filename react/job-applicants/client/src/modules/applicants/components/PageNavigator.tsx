import { Link, useSearchParams } from "react-router";

const PageNavigation = ({pageCount}) => {
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1

    return (
        <>
            <div className="
                flex
                flex-col
                gap-4
                m-5
                pt-4
                border-t

                border-gray-300
                dark:border-gray-700

                md:flex-row
                md:justify-between
                md:items-center"
            >
                <span className="mx-2 md:mx-5">
                    <form action="" method="get">
                        <p>
                            Page
                            <input type="number" name="page" defaultValue={page} min={1} required className="mx-1 w-16 size-min border-2 border-gray-400
                            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors rounded-md"/>
                            of {pageCount}
                        </p>
                    
                        {/* <input type="submit" value="Go" /> */}
                    </form>
                </span>


            {/* <div>
                <a href="?page=1">1</a>
                <a href="?page=2">2</a>
                </div> */}

            
            <div className="flex justify-center hidden md:block">
                <div className="mx-2 md:mx-5 flex flex-wrap justify-center gap-2">

                    <div className="mx-2 md:mx-5">
                        {Array.from({length: pageCount}, (_, i) => {
                            const p = i+1

                            return (
                                <Link key={p} to={`?page=${p}`} className={`mx-1 hover:underline ${page===p? 'text-blue-900 border-2 border-blue-400 rounded-full dark:text-blue-300 dark:border-blue-500' : ''}`} >
                                    {p}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="mx-4">
                <Link to={`?page=${page-1}`} className="mx-4 hover:underline">Previous</Link>
                <Link to={`?page=${page+1}`}  className="mx-4 hover:underline">Next</Link>
            </div>
            </div>

        </>
    );
};

export default PageNavigation;
