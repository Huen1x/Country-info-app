import { Controller, Get, Param } from "@nestjs/common";
import { CountriesService } from "./countries.service";

@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @Get('available')
    async getAvailableCountries() {
        return this.countriesService.getAvailableCountries();
    }

    @Get(':countryCode')
    async getCountryInfo(@Param('countryCode') countryCode: string) {
        return this.countriesService.getCountryInfo(countryCode);
    }

    @Get(':countryCode/holidays/:year')
    async getPublicHolidays(@Param('countryCode') countryCode: string, @Param('year') year: string) {
        return this.countriesService.getPublicHolidays(countryCode, year);
    }

}