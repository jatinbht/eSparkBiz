// import * as React from 'react';
import { useForm } from '@tanstack/react-form';
// import { toast } from 'sonner';

// import { Button } from '@job-applicants/ui/button';
import {
    Card,
    CardContent,
    // CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from '@job-applicants/ui/card';
import {
    Field,
    // FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@job-applicants/ui/field';
import { Input } from '@job-applicants/ui/input';
// import {
//     InputGroup,
//     InputGroupAddon,
//     InputGroupText,
//     InputGroupTextarea,
// } from '@job-applicants/ui/input-group';
import { BasicInfoSchema } from '@job-applicants/schemas/applicant';


export function BasicInfoForm() {
    const form = useForm({
        // defaultValues: {
        //     title: '',
        //     description: '',
        // },
        validators: {
            onSubmit: BasicInfoSchema,
        },
        // onSubmit: 
        // async ({ value }) => {
        //     toast('You submitted the following values:', {
        //         description: (
        //             <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
        //                 <code>{JSON.stringify(value, null, 2)}</code>
        //             </pre>
        //         ),
        //         position: 'bottom-right',
        //         classNames: {
        //             content: 'flex flex-col gap-2',
        //         },
        //         style: {
        //             '--border-radius': 'calc(var(--radius)  + 4px)',
        //         } as React.CSSProperties,
        //     });
        // },
    });

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Basic Info</CardTitle>
                {/* <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription> */}
            </CardHeader>
            <CardContent>
                <form
                    id="basic-info-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            // name="title" // original code
                            name="firstName"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            First Name
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            // value={field.state.value} //TODO: gives some sort of error when uncommented
                                            onBlur={field.handleBlur}
                                            onChange={(e) => 
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            aria-invalid={isInvalid}
                                            // placeholder="Login button not working on mobile"
                                            autoComplete="off"
                                        />
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />


                    </FieldGroup>
                </form>
            </CardContent>

        </Card>
    );
}
