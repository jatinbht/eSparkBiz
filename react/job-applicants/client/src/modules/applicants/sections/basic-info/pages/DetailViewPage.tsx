import { BugReportForm } from "@/modules/applicants/components/Form";
import { Edit } from "lucide-react";

export function DetailViewPage () {

    return(
        <>
            <Edit className="flex items-end"/>
            <BugReportForm />
        </>
    )
}