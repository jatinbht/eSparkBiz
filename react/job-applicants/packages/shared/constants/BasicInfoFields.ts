// export const basicInfoFilterableColumns = [
//     { key: 'city',                label: 'City',                type: 'distinct',   paramKeys: ['city'] },
//     { key: 'state',               label: 'State',               type: 'distinct',   paramKeys: ['state'] },
//     { key: 'designation',         label: 'Designation',         type: 'distinct',   paramKeys: ['designation'] },
//     { key: 'gender',              label: 'Gender',              type: 'enum',       paramKeys: ['gender'],                  options: ['male', 'female', 'other'] },
//     { key: 'relationship_status', label: 'Relationship Status', type: 'enum',       paramKeys: ['relationship_status'],     options: ['single', 'committed'] },
//     { key: 'dob',                 label: 'Date of Birth',       type: 'daterange',  paramKeys: ['dob_from', 'dob_to'] },
// ] as const;

import type { BasicInfo } from '@job-applicants/schemas';
import type { BasicInfoFieldDefinition } from '../types/fieldDefinition';
import { today } from '../date';

type Visibility = 'table' | 'form' | 'detail';

export type Option<T = string> = {
    value: T;
    label: string;
};
type CommonFieldOptions = {
    placeholder?: string;
    disabled?: boolean;
    // required?: boolean; //put this in zod schema

    // NOTE: moved to specific fields fieldProps (like DateFieldOptions)
    // options?: readonly Option[];     //combobox
    // rows?: number;                   // textarea
    // min?: string;                    // date/number
    // max?: string;

    //Keep this object about the field, not the page layout. Layout belongs in the form/page, not in the field definition.
    // layout?: {
    //     columnSpan?: number,
    //     // gridSpan;
    //     // className;
    //     // containerClass;
    //     // labelClass;
    // }
};


export type BasicInfoFieldBaseDefinition = {
    key: keyof BasicInfo;

    dbColumn: string;

    label: string;

    // fieldType:
    //     | 'text'
    //     | 'textarea'
    //     | 'email'
    //     | 'tel'
    //     | 'date'
    //     | 'select'
    //     | 'radio';

    formatter?: Formatter;

    sortable?: boolean;

    // isVisibleIn: {
    //     table?: boolean;
    //     form?: boolean;
    //     detail?: boolean;
    // };
    visibility: readonly Visibility[];

    filter?: FilterConfig;

    // fieldProps?: fieldProps;
};

export type TextFieldOptions = CommonFieldOptions;

export type DateFieldOptions = CommonFieldOptions & {
    min?: string;
    max?: string;
};

export type TextareaFieldOptions = CommonFieldOptions & {
    rows?: number;
};

export type SelectFieldOptions = CommonFieldOptions & {
    options?: readonly Option[];
};

export type RadioFieldOptions = CommonFieldOptions & {
    options: readonly Option[];
};



//used in basicInfoFIelds
type FilterConfig =
    | {
          type: 'distinct';
          paramKeys: readonly string[];
      }
    | {
          type: 'enum';
          paramKeys: readonly string[];
          options: readonly string[];
      }
    | {
          type: 'daterange';
          paramKeys: readonly string[];
      };

// used in basicInfoFields
export type Formatter = 'date' | 'email' | 'phone';

export const basicInfoFields: readonly BasicInfoFieldDefinition[] = [
    {
        key: 'firstName',
        dbColumn: 'first_name',
        label: 'First Name',
        fieldType: 'text',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: undefined,
        fieldProps: {
            placeholder: 'John',
            // required: true,
        },
    },

    {
        key: 'lastName',
        dbColumn: 'last_name',
        label: 'Last Name',
        fieldType: 'text',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: undefined,
    },

    {
        key: 'designation',
        dbColumn: 'designation',
        label: 'Designation',
        fieldType: 'text',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'distinct',
            paramKeys: ['designation'],
        },
    },

    {
        key: 'email',
        dbColumn: 'email',
        label: 'E-mail',
        fieldType: 'email',
        formatter: 'email',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: undefined,
    },

    {
        key: 'phone',
        dbColumn: 'phone',
        label: 'Phone',
        fieldType: 'tel',
        formatter: 'phone',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: undefined,
    },

    {
        key: 'country',
        dbColumn: 'country',
        label: 'Country',
        fieldType: 'select',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'distinct',
            paramKeys: ['country'],
        },
    },

    {
        key: 'state',
        dbColumn: 'state',
        label: 'State',
        fieldType: 'select',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'distinct',
            paramKeys: ['state'],
        },

        // fieldProps: {
        //     options: [
        //         {
        //             value: 'gujarat',
        //             label: 'Gujarat',
        //         },
        //         {
        //             value: 'rajasthan',
        //             label: 'Rajasthan',
        //         },
        //     ],
        // },
    },

    {
        key: 'city',
        dbColumn: 'city',
        label: 'City',
        fieldType: 'select',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'distinct',
            paramKeys: ['city'],
        },
    },

    {
        key: 'gender',
        dbColumn: 'gender',
        label: 'Gender',
        fieldType: 'radio',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'enum',
            paramKeys: ['gender'],
            options: ['male', 'female', 'other'],
        },
        fieldProps: {
            options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
            ],
        },
    },

    {
        key: 'zipCode',
        dbColumn: 'zip_code',
        label: 'Zip Code',
        fieldType: 'text',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: undefined,
    },

    {
        key: 'relationshipStatus',
        dbColumn: 'relationship_status',
        label: 'Relationship Status',
        fieldType: 'select',
        sortable: false,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'enum',
            paramKeys: ['relationshipStatus'],
            options: ['single', 'committed'],
        },
        fieldProps: {
            options: [
                {
                    value: 'single',
                    label: 'Single',
                },
                {
                    value: 'committed',
                    label: 'Committed',
                },
            ],
        },
    },

    {
        key: 'dob',
        dbColumn: 'dob',
        label: 'Date of Birth',
        fieldType: 'date',
        formatter: 'date',
        sortable: true,
        visibility: ['table', 'form', 'detail'],
        filter: {
            type: 'daterange',
            paramKeys: ['dobFrom', 'dobTo'],
        },
        fieldProps: {
            max: today()
            // max: today //"Don't let the user pick tomorrow." // this is not real validation
        },
    },

    {
        key: 'createdAt',
        dbColumn: 'created_at',
        label: 'Created At',
        fieldType: 'date',
        formatter: 'date',
        sortable: true,
        visibility: ['detail'],
        filter: undefined,
    },

    {
        key: 'id',
        dbColumn: 'id',
        label: 'ID',
        fieldType: 'text',
        sortable: true,
        visibility: ['detail'],
        filter: undefined,
    },
]

export type BasicInfoField = BasicInfoFieldDefinition;

export type FilterableBasicInfoField = BasicInfoField & {
    filter: NonNullable<BasicInfoField['filter']>;
};

export function isFilterableField(
    field: BasicInfoField,
): field is FilterableBasicInfoField {
    return field.filter !== undefined;
}

export const filterableBasicInfoFields: FilterableBasicInfoField[] = basicInfoFields.filter(
    isFilterableField,
);

function isVisibleIn(section: Visibility) {
    return (field: BasicInfoField) =>
        (field.visibility as readonly Visibility[]).includes(section);
}

export const tableBasicInfoFields = basicInfoFields.filter(
    isVisibleIn('table'),
);

export type TableBasicInfoField = (typeof tableBasicInfoFields)[number];

// const filterableBasicInfoFields = basicInfoFields.filter(
//     (
//         field,
//     ): field is (typeof basicInfoFields)[number] & {
//         filter: NonNullable<(typeof field)['filter']>;
//     } => field.filter !== undefined,
// );

// export const filterableBasicInfoFields = basicInfoFields.filter(
//     (
//         field,
//     ): field is Extract<
//         (typeof basicInfoFields)[number],
//         { filter: object }
//     > => field.filter !== undefined,
// );

export const detailBasicInfoFields = basicInfoFields.filter(
    isVisibleIn('detail'),
);

export type FormBasicInfoField = BasicInfoFieldDefinition;

export function isFormField(field: BasicInfoField): field is FormBasicInfoField {
    return (field.visibility as readonly Visibility[]).includes('form');
}

export const formBasicInfoFields = basicInfoFields.filter(
    isFormField,
);



//## Filtering

export type BasicInfoFilterOptions = Partial<Record<string, string[]>>;

export function getFormFieldDefinition(
    key: FormBasicInfoField['key'],
): FormBasicInfoField {
    const field = formBasicInfoFields.find((field) => field.key === key);

    if (!field) {
        throw new Error(`Unknown form field: ${key}`);
    }

    return field;
}

export type BasicInfoFilterColumn = typeof filterableBasicInfoFields[number]['key'];

export type BasicInfoFilterType = FilterConfig['type'];

export type DateRangeValue = { from?: string; to?: string };

export type ActiveFilterValue = string[] | DateRangeValue;

export type ActiveFilters = Partial<Record<BasicInfoFilterColumn, ActiveFilterValue>>;