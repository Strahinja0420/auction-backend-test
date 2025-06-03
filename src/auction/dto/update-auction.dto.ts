import { PartialType } from '@nestjs/mapped-types';
import { CreateAuctionDto } from './create-auction.dto';
import { IsOptional, IsEnum } from 'class-validator';

export class UpdateAuctionDto extends PartialType(CreateAuctionDto) {
  @IsOptional()
  @IsEnum(AuctionStatus)
  status?: AuctionStatus;
}

// src/auction/dto/create-bid.dto.ts
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { AuctionStatus } from 'generated/prisma';

export class CreateBidDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  auctionId: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  bidderId: number;
}