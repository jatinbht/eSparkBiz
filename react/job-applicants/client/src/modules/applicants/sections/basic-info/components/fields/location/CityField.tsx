import { getFormFieldDefinition } from "@job-applicants/shared/constants";
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
                countryCode: state.values.country_code,
                stateCode: state.values.state_code,
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