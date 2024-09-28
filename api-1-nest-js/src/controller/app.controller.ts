import { Controller, Get, HttpCode, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { UploadImageDto } from '../DTO/UploadImageDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../service/Image.service';
import { ResponseImage } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private service: ImageService) { }

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @HttpCode(207)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{ message: String } | { error: String }> {

    console.log(file);
    try {

      if (file.mimetype.match("/\/(jpg|jpeg|png)$/") || file === undefined) {
        return { error: "Apenas arquivos de imagem são permitidos! " }
      }
      this.service.createResponseImage(file)
      return { message: `Imagem ${file.originalname} enviada com sucesso!` };

    } catch (error) {

      throw new HttpException(
        {
          error: "Erro ao receber o a imagem",
          details: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    }
  }

  @Get("findAll")
  async findAll(): Promise<ResponseImage[]> {
    return this.service.findAll();
  }

}


