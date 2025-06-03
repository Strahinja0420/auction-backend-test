import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { CreateBidDto } from './dto/update-auction.dto';

@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionService.create(createAuctionDto);
  }

  // @Post('bid')
  // placeBid(@Body() createBidDto: CreateBidDto) {
  //   return this.auctionService.placeBid(createBidDto);
  // }

  @Get('active')
  async getActiveAuctions(
    @Query('category') category?: string,
    @Query('creatorId') creatorId?: number,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    try {
      // Parse and validate query parameters
      const parsedLimit = limit ? parseInt(limit, 10) : 50;
      const parsedOffset = offset ? parseInt(offset, 10) : 0;

      // Validate parsed numbers
      if (limit && isNaN(parsedLimit)) {
        throw new HttpException(
          'Invalid limit parameter',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (offset && isNaN(parsedOffset)) {
        throw new HttpException(
          'Invalid offset parameter',
          HttpStatus.BAD_REQUEST,
        );
      }

      const filters = {
        category,
        creatorId: creatorId,
        limit: parsedLimit,
        offset: parsedOffset,
      };

      return await this.auctionService.findAll(filters);
    } catch (error) {
      console.log('error');
    }
  }

  @Get()
  async getAllAuctions(
    @Query('category') category?: string,
    @Query('status') status?: string,
    @Query('creatorId') creatorId?: number,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<any[]> {
    try {
      // Parse and validate query parameters
      const parsedLimit = limit ? parseInt(limit, 10) : 50;
      const parsedOffset = offset ? parseInt(offset, 10) : 0;

      // Validate parsed numbers
      if (limit && isNaN(parsedLimit)) {
        throw new HttpException(
          'Invalid limit parameter',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (offset && isNaN(parsedOffset)) {
        throw new HttpException(
          'Invalid offset parameter',
          HttpStatus.BAD_REQUEST,
        );
      }

      const filters = {
        category,
        status,
        creatorId,
        limit: parsedLimit,
        offset: parsedOffset,
      };

      return await this.auctionService.findAll(filters);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch auctions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
