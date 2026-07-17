import type { ApplicantForm } from "../../../hooks/useBasicInfoForm";
import { getCountryOptions } from "../../../lib/location";
import { FormField } from "../FormField";
import { getFormFieldDefinition } from "@job-applicants/shared/constants/BasicInfoFields";

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