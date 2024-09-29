import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ImageService } from './service/Image.service';
import { Axios } from 'axios'

@Module({
  imports: [Axios],
  controllers: [AppController],
  providers: [AppService, ImageService],
})
export class AppModule { }
