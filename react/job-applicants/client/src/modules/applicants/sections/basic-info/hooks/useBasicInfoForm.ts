import { EMPTY_BASIC_INFO } from '@/constants';
import { CreateBasicInfoSchema } from '@job-applicants/schemas/applicant';
import { useForm } from '@tanstack/react-form'; // or your specific library
import { createApplicant } from '../api';

export const useApplicantForm = () => {
  const form = useForm({
    defaultValues: EMPTY_BASIC_INFO,
    validators: {
      onChange: CreateBasicInfoSchema,
      onSubmit: CreateBasicInfoSchema,
    //   onBlur
    },
    onSubmit: async ({ value }) => {
      await createApplicant(value);
    },
  });

  return form;
};

// Extract the type from the hook's return type
export type ApplicantForm = ReturnType<typeof useApplicantForm>;