// rename

// renderField()

// to

// renderFormField()
// Because later you'll probably have

// renderTableCell()

// renderDetailField()

// renderFilterField()

// renderSearchField()

// The word Field becomes ambiguous.

import type {
    FormBasicInfoField,
    Option,
} from '@job-applicants/shared/constants';
import type { AnyFieldApi } from '@tanstack/react-form';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { RadioField } from './RadioField';
import { DateField } from './DateField';
import { PhoneField } from './PhoneField';

const FIELD_COMPONENTS = {
    text: InputField,
    email: InputField,
    tel: PhoneField,
    date: DateField,
    select: SelectField,
    radio: RadioField,
};

export function renderFieldComponent(
    fieldDefinition: FormBasicInfoField,
    field: AnyFieldApi,
    // form: AnyFormApi
    // form: ApplicantForm,
    options: readonly Option[],
) {
    // switch (fieldDefinition.fieldType) {
    //     case 'text':
    //     case 'email':
    //         return (
    //             <InputField fieldDefinition={fieldDefinition} field={field} />
    //         );
    //     case 'tel':
    //         return (
    //             <PhoneInput
    //                 value={field.state.value}
    //                 onChange={(value) => field.handleChange(value ?? '')}
    //                 defaultCountry="IN"
    //             />
    //         );

    //     case 'date':
    //         return (
    //             <DateField fieldDefinition={fieldDefinition} field={field} />
    //         );

    //     case 'select':
    //                 return (
    //                     <SelectField
    //                         fieldDefinition={fieldDefinition}
    //                         field={field}
    //                         options={options}
    //                     />
    //                 );

    //     case 'radio':
    //         return (
    //             <RadioField fieldDefinition={fieldDefinition} field={field} />
    //         );

    //     // case "textarea":
    //     //     return (
    //     //         <TextareaField
    //     //             fieldDefinition={fieldDefinition}
    //     //             field={field}
    //     //         />
    //     //     );
    // }

    const Component = FIELD_COMPONENTS[fieldDefinition.fieldType];

    return (
        <Component
            fieldDefinition={fieldDefinition}
            field={field}
            options={options}
        />
    );
}
