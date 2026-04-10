import { body } from 'express-validator';

const createBasicInfoValidators = [
    body('first-name').notEmpty().trim(),
    body('last-name').notEmpty().trim(),
    body('designation').trim().notEmpty().toLowerCase(),
    body('email').isEmail().normalizeEmail(),
    body('phone').isMobilePhone(),
    body('city').trim().isAlpha('en-IN', { ignore: ' ' }).isLength({ min: 2 }), 
    body('state')
        .optional({ values: 'falsy' })
        .trim()
        .toLowerCase()
        .isIn(['gujarat', 'rajasthan']),
    body('gender').trim().isIn('male', 'female', 'other'), //is trim required after isIn menthod?
    body('zip').optional({ values: 'falsy' }).trim().isPostalCode('US'),
    body('relationship')
        .optional({ values: 'falsy' })
        .isIn(['single', 'committed']),
    body('dob').isDate(),
];

export { createBasicInfoValidators };
