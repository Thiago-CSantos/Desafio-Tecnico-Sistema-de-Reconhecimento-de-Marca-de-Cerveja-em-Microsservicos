import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../service/Image.service';
import { ResponseImage } from '@prisma/client';
import axios from 'axios';
import * as FormData from 'form-data';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller()
export class AppController {
  constructor(private service: ImageService) { }

  @Post('upload')
  @HttpCode(207)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{ marca: String, status: Number } | { error: String }> {

    // console.log(file);
    try {

      // Verifica se um arquivo foi enviado
      if (!file) {
        return { error: "Nenhum arquivo enviado!" };
      }

      if (file.mimetype.match("/\/(jpg|jpeg|png)$/") || file === undefined) {
        return { error: "Apenas arquivos de imagem são permitidos! " }
      }

      const formData = new FormData();
      formData.append('image', file.buffer, { contentType: file.mimetype, filename: file.originalname });

      const resposta = await axios.post("http://flask-api:5000/api/process-image", formData, { headers: { "Content-Type": "multipart/form-data" } });

      if (resposta.status != 200) {
        return { error: HttpErrorByCode[422].toString() }
      }

      const marca: string = this.service.removeEspacos(resposta.data.dados);

      this.service.createResponseImage(file, marca);
      return { marca: marca, status: resposta.status }

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

  @Get("logs")
  async findAll(): Promise<ResponseImage[]> {
    return this.service.findAll();
  }

  @Get("logs/:id")
  async getLogsId(@Param('id') id: string): Promise<ResponseImage> {
    return this.service.findOne(id);
  }

}


