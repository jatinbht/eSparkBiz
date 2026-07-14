import {
    formBasicInfoFields,
    type FormBasicInfoField,
} from '@job-applicants/shared/constants';

import { FieldGroup } from '@/components/ui/field';
import type { ApplicantForm } from '../hooks/useBasicInfoForm';

import { CityField, CountryField, FormField, StateField } from './fields';


type BasicInfoFormProps = {
    form: ApplicantForm;
};

const LOCATION_KEYS = new Set([
    'country',
    'state',
    'city',
]);

export function BasicInfoForm({ form }: BasicInfoFormProps) {
    function createFormField(fieldDefinition: FormBasicInfoField) {
        if (LOCATION_KEYS.has(fieldDefinition.key)) {
            return null;
        }

        return (
            <form.Field
                key={fieldDefinition.key}
                name={fieldDefinition.key}
            >
                {(field) => (
                    <FormField
                        fieldDefinition={fieldDefinition}
                        field={field}
                    />
                )}
            </form.Field>
        );
    }

    return (
        <FieldGroup>
            {formBasicInfoFields.map(createFormField)}

            <CountryField form={form} />
            <StateField form={form} />
            <CityField form={form} />
        </FieldGroup>
    );
}