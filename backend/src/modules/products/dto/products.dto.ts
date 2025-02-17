import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    operationCode: string;

    @IsString()
    @IsNotEmpty()
    localSizetype: string;

    @IsString()
    @IsNotEmpty()
    isoSizetype: string;

    @IsString()
    @IsNotEmpty()
    cargoTypeCode: string;

    @IsString()
    @IsNotEmpty()
    emptyCargoTypeCode: string;
}

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    operationCode: string;

    @IsString()
    @IsNotEmpty()
    localSizetype: string;

    @IsString()
    @IsNotEmpty()
    isoSizetype: string;

    @IsString()
    @IsNotEmpty()
    cargoTypeCode: string;

    @IsString()
    @IsNotEmpty()
    emptyCargoTypeCode: string;
}