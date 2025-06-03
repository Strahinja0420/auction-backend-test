import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuctionService {
  constructor(private db: DatabaseService) {}

  async create(createAuctionDto: CreateAuctionDto) {
    const auction = await this.db.auction.create({
      data: {
        ...createAuctionDto,
        startTime: new Date(createAuctionDto.startTime),
        endTime: new Date(createAuctionDto.endTime),
        images: createAuctionDto.images || [],
      },
      include: {
        _count: {
          select: { bids: true },
        },
      },
    });

    return {
      ...auction,
      startingBid: Number(auction.startingBid),
      currentBid: auction.currentBid ? Number(auction.currentBid) : null,
      reservePrice: auction.reservePrice ? Number(auction.reservePrice) : null,
      buyNowPrice: auction.buyNowPrice ? Number(auction.buyNowPrice) : null,
      bidCount: auction._count?.bids || 0,
    };
  }

  async findAll(filters?: {
    category?: string;
    status?: string;
    creatorId?: number;
    limit?: number;
    offset?: number;
  }) {
    const auctions = await this.db.auction.findMany({
      where: {
        status: 'ACTIVE',
        endTime: {
          gt: new Date(),
        },
        ...(filters?.category && { category: filters.category as any }),
        ...(filters?.creatorId && { creatorId: filters.creatorId }),
      },
      include: {
        _count: {
          select: {
            bids: true,
          },
        },
      },
      take: filters?.limit || 50,
      skip: filters?.offset || 0,
      orderBy: {
        endTime: 'asc',
      },
    });

    return auctions.map((auction) => ({
      ...auction,
      startingBid: Number(auction.startingBid),
      currentBid: auction.currentBid ? Number(auction.currentBid) : null,
      reservePrice: auction.reservePrice ? Number(auction.reservePrice) : null,
      buyNowPrice: auction.buyNowPrice ? Number(auction.buyNowPrice) : null,
      bidCount: auction._count?.bids || 0,
    }));
  }
  

  findOne(id: number) {
    return `This action returns a #${id} auction`;
  }

  update(id: number, updateAuctionDto: UpdateAuctionDto) {
    return `This action updates a #${id} auction`;
  }

  remove(id: number) {
    return `This action removes a #${id} auction`;
  }
}
