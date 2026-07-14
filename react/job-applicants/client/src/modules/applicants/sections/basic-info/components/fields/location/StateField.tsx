import { getFormFieldDefinition } from "@job-applicants/shared/constants";
import type { ApplicantForm } from "../../../hooks/useBasicInfoForm";
import { getStateOptions } from "../../../lib/location";
import { FormField } from "../FormField";

type Props = {
    form: ApplicantForm;
};

const stateFieldDefinition = getFormFieldDefinition('state');

export function StateField({ form }: Props) {
    return (
        <form.Subscribe
            selector={(state) => state.values.country}
        >
            {(countryCode) => (
                <form.Field name="state">
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