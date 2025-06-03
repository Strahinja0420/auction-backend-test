import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AuctionModule } from './auction/auction.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, AuctionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
