import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [BullModule.registerQueue({ name: 'csv-jobs' }), PrismaModule],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
