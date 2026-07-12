import { getFormFieldDefinition } from "@job-applicants/shared/constants";
import type { ApplicantForm } from "../../../hooks/useBasicInfoForm";
import { getStateOptions } from "../../../lib/location";
import { FormField } from "../FormField";

type Props = {
    form: ApplicantForm;
};

const stateFieldDefinition = getFormFieldDefinition('state_code');

export function StateField({ form }: Props) {
    return (
        <form.Subscribe
            selector={(state) => state.values.country_code}
        >
            {(countryCode) => (
                <form.Field name="state_code">
                    {(field) => (
                        <FormField
                            fieldDefinition={stateFieldDefinition}
                            field={field}
                            // form={form}
                            options={getStateOptions(countryCode)}
                        />
                    )}
                </form.Field>
            )}
        </form.Subscribe>
    );
}