import { getFormFieldDefinition } from '@job-applicants/shared';
import type { ApplicantForm } from "../../../hooks/useBasicInfoForm";
import { getCityOptions } from "../../../lib/location";
import { FormField } from "../FormField";

type Props = {
    form: ApplicantForm;
};

const cityFieldDefinition = getFormFieldDefinition('city');

export function CityField({ form }: Props) {
    return (
        <form.Subscribe
            selector={(state) => ({
                countryCode: state.values.country,
                stateCode: state.values.state,
            })}
        >
            {({ countryCode, stateCode }) => (
                <form.Field name="city">
                    {(field) => (
                        <FormField
                            fieldDefinition={cityFieldDefinition}
                            field={field}
                            // form={form}
                            options={getCityOptions(
                                countryCode,
                                stateCode,
                            )}
                        />
                    )}
                </form.Field>
            )}
        </form.Subscribe>
    );
}