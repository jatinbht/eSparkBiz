import type { AnyFieldApi } from "@tanstack/react-form";
import { PhoneInput } from "./PhoneInput";

export function PhoneField({
    field,
}: {
    field: AnyFieldApi;
}) {
    return (
        <PhoneInput
            defaultCountry="IN"
            value={field.state.value}
            onChange={(value) => field.handleChange(value ?? "")}
        />
    );
}