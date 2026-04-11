import { Router } from "express";
import { addApplicant, getApplicantDetails, listApplicants } from "./controller.js";
import { createBasicInfoValidators } from "./validator.js";
import { validateRequest } from "./middleware.js";

const applicantApiRouter = Router()
const applicantRouter = Router()
console.debug('router.js executed')
applicantApiRouter.get('/', listApplicants)
applicantApiRouter.get('/:id', getApplicantDetails)
applicantApiRouter.post('/', createBasicInfoValidators, validateRequest, addApplicant)


// applicantRouter.get('/', applicantsListView)
// applicantRouter.get('/:id', applicantDetailView)

export {
    applicantApiRouter
    // , applicantRouter
}