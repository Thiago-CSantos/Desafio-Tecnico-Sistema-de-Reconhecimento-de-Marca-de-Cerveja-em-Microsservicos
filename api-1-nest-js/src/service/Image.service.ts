import { Injectable } from "@nestjs/common";
import { PrismaClient, ResponseImage } from "@prisma/client";

@Injectable()
export class ImageService extends PrismaClient {
    constructor() {
        super();
    }

    async createResponseImage(file: Express.Multer.File): Promise<ResponseImage> {
        console.log("teste")
        return this.responseImage.create({
            data: {
                marca: "teste",
                dataHora: new Date(),
                buffer: file.buffer
            }
        })
    }

    async findAll(): Promise<ResponseImage[]> {
        return this.responseImage.findMany()
    }

}