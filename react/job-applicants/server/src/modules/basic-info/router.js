import { Router } from "express";
import { addApplicant, getApplicantDetails, listApplicants } from "./controller.js";
import { createBasicInfoValidators } from "./validator.js";
import { validateRequest } from "../../middleware/request-validator.js";
import idValidator from "../../middleware/id-validator.js";

const applicantApiRouter = Router()
const applicantRouter = Router()
console.debug('router.js executed')
applicantApiRouter.get('/', listApplicants)
applicantApiRouter.get('/:id', idValidator, validateRequest, getApplicantDetails)
applicantApiRouter.post('/', createBasicInfoValidators, validateRequest, addApplicant)


// applicantRouter.get('/', applicantsListView)
// applicantRouter.get('/:id', applicantDetailView)

export {
    applicantApiRouter
    // , applicantRouter
}