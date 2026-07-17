import { Country, State, City } from "country-state-city";
import type { Option } from '@job-applicants/shared/constants/BasicInfoFields';

// export const countries = Country.getAllCountries();

// export function getStates(countryCode: string) {
//     return State.getStatesOfCountry(countryCode);
// }

// export function getCities(
//     countryCode: string,
//     stateCode: string,
// ) {
//     return City.getCitiesOfState(countryCode, stateCode);
// }



export function getCountryOptions(): Option[] {
    return Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
    }));
}

export function getStateOptions(countryCode: string): Option[] {
    return State.getStatesOfCountry(countryCode).map((state) => ({
        value: state.isoCode,
        label: state.name,
    }));
}

export function getCityOptions(
    countryCode: string,
    stateCode: string,
): Option[] {
    return City.getCitiesOfState(countryCode, stateCode).map((city) => ({
        value: city.name,
        label: city.name,
    }));
}