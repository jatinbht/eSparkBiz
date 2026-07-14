import type { BasicInfoFieldBaseDefinition, TextFieldOptions, DateFieldOptions, SelectFieldOptions, RadioFieldOptions, TextareaFieldOptions } from "../constants";


// If you later make basicInfoFields generic enough that each element preserves the relationship

// key: "firstName"  ↔  dbColumn: "firstName"
// key: "dob"        ↔  dbColumn: "dob"

// instead of widening to a union of all possible keys, TypeScript can verify the assignment without any.

// That requires a more advanced generic definition, something like:

// type FieldDefinition<
//     TForm,
//     TDb,
//     TKey extends keyof TForm,
//     TDbKey extends keyof TDb,
// > = {
//     key: TKey;
//     dbColumn: TDbKey;
// };


export type InputFieldDefinition<T extends 'text' | 'email' | 'tel'> =
    BasicInfoFieldBaseDefinition & {
        fieldType: T;
        fieldProps?: TextFieldOptions;
    };

export type TextFieldDefinition = InputFieldDefinition<'text'>;
export type EmailFieldDefinition = InputFieldDefinition<'email'>;
export type TelFieldDefinition = InputFieldDefinition<'tel'>;

export type DateFieldDefinition = BasicInfoFieldBaseDefinition & {
    fieldType: 'date';
    fieldProps?: DateFieldOptions;
};

export type SelectFieldDefinition = BasicInfoFieldBaseDefinition & {
    fieldType: 'select';
    fieldProps?: SelectFieldOptions;
};

export type RadioFieldDefinition = BasicInfoFieldBaseDefinition & {
    fieldType: 'radio';
    fieldProps: RadioFieldOptions;
};

export type TextareaFieldDefinition = BasicInfoFieldBaseDefinition & {
    fieldType: 'textarea';
    fieldProps?: TextareaFieldOptions;
};

export type BasicInfoFieldDefinition =
    | TextFieldDefinition
    | EmailFieldDefinition
    | TelFieldDefinition
    | DateFieldDefinition
    | TextareaFieldDefinition
    | SelectFieldDefinition
    | RadioFieldDefinition;
    