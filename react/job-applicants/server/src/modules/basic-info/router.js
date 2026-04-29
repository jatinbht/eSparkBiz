import { Router } from "express";
// import { addApplicant, getApplicantDetails, listApplicants } from "./controller.js";
import * as controller from './controller.js';

// import { createBasicInfoValidators } from "./validator.js";
import { validateRequestExpressValidator, validateRequestZod } from "../../middleware/request-validator.js";
import idValidator from "../../middleware/id-validator.js";
import { createBasicInfoSchema } from '@job-applicants/schemas';

const router = Router()
console.debug('router.js executed')
router.get('/', controller.list)
router.get('/:id', 
    idValidator, 
    validateRequestExpressValidator, 
    controller.show
)
// applicantApiRouter.post('/', createBasicInfoValidators, validateRequest, createApplicant)

router.post('/', validateRequestZod(createBasicInfoSchema), controller.create);



export {
    router as applicantApiRouter
}