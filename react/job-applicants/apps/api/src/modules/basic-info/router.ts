import { Router } from "express";
// import { addApplicant, getApplicantDetails, listApplicants } from "./controller.js";
import * as controller from './controller.js';

// import { createBasicInfoValidators } from "./validator.js";
import { validateRequestExpressValidator, validateRequestZod } from "../../middleware/request-validator.js";
import idValidator from "../../middleware/id-validator.js";
import { BasicInfoQuerySchema } from "./schema.js";
import { IdSchema } from "@job-applicants/schemas/id";
import { CreateBasicInfoSchema } from "@job-applicants/schemas/applicant";

const router = Router()
console.debug('router.js executed')
router.get('/', validateRequestZod(BasicInfoQuerySchema, "query"), controller.list)
// router.get('/distinct/:column', validateRequestZod(distinctColumnSchema, 'params'), controller.distinct)
router.get('/filter-options', controller.filterOptions)

router.get('/:id', 
    idValidator, 
    // validateRequestExpressValidator, 
    validateRequestZod(IdSchema, 'params'),
    controller.show
)
// applicantApiRouter.post('/', createBasicInfoValidators, validateRequest, createApplicant)

router.post('/', validateRequestZod(CreateBasicInfoSchema, 'body'), controller.create);



export {
    router as applicantApiRouter
}