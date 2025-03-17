import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class CountriesService {
    constructor(private readonly httpService: HttpService) {}

    async getAvailableCountries() {
        try{
        const response = await firstValueFrom(
            this.httpService.get('https://date.nager.at/api/v3/AvailableCountries')
        );
        return response.data;
        } catch (error) {
            throw new HttpException('Failed to fetch countries', HttpStatus.BAD_GATEWAY);
        }
    }


    async getCountryInfo(countryCode: string) {
        try{
        const countryInfo = await firstValueFrom(
            this.httpService.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
        );

        const populationData = await firstValueFrom(
            this.httpService.post('https://countriesnow.space/api/v0.1/countries/population', {
                country: countryInfo.data.commonName,
            })
        );

        const flagData = await firstValueFrom(
            this.httpService.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
                country: countryInfo.data.commonName,
            })
        );

        return {
            ...countryInfo.data,
            population: populationData.data,
            flagUrl: flagData.data,
        };
        
        } catch(error) {
            throw new HttpException('Failed to fetch country details', HttpStatus.BAD_GATEWAY);
        }
    }

    async getPublicHolidays(countryCode: string, year: string) {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
            );
            return response.data;
        } catch (error) {
            throw new HttpException('Failed to fetch public holidays', HttpStatus.BAD_GATEWAY);
        }
    }
}