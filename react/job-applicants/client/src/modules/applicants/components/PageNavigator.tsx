import { Link, useSearchParams } from 'react-router';
import { buttonVariants } from '@/components/ui/button';
import { buildApplicantsQueryParams } from '../utils/applicantsQueryParamBuilder';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const PageNavigation = ({ pageCount }) => {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    return (
        <>
            <div className="flex items-center justify-between px-2">
                <div>
                    Page {page} of {pageCount}
                </div>

                <div className="flex items-center space-x-2">
                    <Link
                        to={buildApplicantsQueryParams(searchParams, {
                            page: page - 1,
                        })}
                        aria-disabled={page <= 1}
                        className={cn(
                            buttonVariants({
                                variant: 'outline',
                                size: 'icon',
                            }),
                            page <= 1 && 'pointer-events-none opacity-50',
                        )}
                    >
                        <ChevronLeft />
                    </Link>

                    <Link
                        to={buildApplicantsQueryParams(searchParams, {
                            page: page + 1,
                        })}
                        aria-disabled={page >= pageCount}
                        className={cn(
                            buttonVariants({
                                variant: 'outline',
                                size: 'icon',
                            }),
                            page >= pageCount &&
                                'pointer-events-none opacity-50',
                        )}
                    >
                        <ChevronRight />
                    </Link>
                </div>
            </div>
        </>
    );
};
export default PageNavigation;
