import type { ApplicantForm } from "../../../hooks/useBasicInfoForm";
import { getCountryOptions } from "../../../lib/location";
import { FormField } from "../FormField";
import { getFormFieldDefinition } from "@job-applicants/shared/constants";

type Props = {
    form: ApplicantForm;
};

const countryFieldDefinition = getFormFieldDefinition('country_code');

export function CountryField({ form }: Props) {
    return (
        <form.Field name="country_code">
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