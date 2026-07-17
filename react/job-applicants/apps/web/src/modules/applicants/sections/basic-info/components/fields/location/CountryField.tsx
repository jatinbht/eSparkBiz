import type { ApplicantForm } from '#src/modules/applicants/sections/basic-info/hooks/useBasicInfoForm';
import { getCountryOptions } from '#src/modules/applicants/sections/basic-info/lib/location';
import { FormField } from '../FormField';
import { getFormFieldDefinition } from '@job-applicants/shared';

type Props = {
    form: ApplicantForm;
};

const countryFieldDefinition = getFormFieldDefinition('country');

export function CountryField({ form }: Props) {
    return (
        <form.Field name="country">
            {(field) => (
                <FormField
                    fieldDefinition={countryFieldDefinition}
                    field={field}
                    // form={form}
                    options={getCountryOptions()}
                />
            )}
        </form.Field>
    );
}