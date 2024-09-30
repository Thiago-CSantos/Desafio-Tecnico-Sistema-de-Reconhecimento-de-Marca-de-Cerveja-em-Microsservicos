import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { ImageService } from './service/Image.service';
import { Axios } from 'axios'

@Module({
  imports: [Axios],
  controllers: [AppController],
  providers: [ImageService],
})
export class AppModule { }
