import { CreateBasicInfoSchema } from '@job-applicants/schemas';
import { useForm } from '@tanstack/react-form'; // or your specific library
import { createApplicant } from '@job-applicants/api-client';
import { EMPTY_BASIC_INFO } from '#src/constants';

export const useApplicantForm = () => {
  const form = useForm({
    defaultValues: EMPTY_BASIC_INFO,
    validators: {
      onChange: CreateBasicInfoSchema,
      onSubmit: CreateBasicInfoSchema,
    //   onBlur
    },
    onSubmit: async ({ value }) => {
      // console.log('Submitting: ', value);
      await createApplicant(value);
    },
  });

  return form;
};

// Extract the type from the hook's return type
export type ApplicantForm = ReturnType<typeof useApplicantForm>;