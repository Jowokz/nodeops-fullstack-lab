import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtGuard } from '../auth/jwt.guard';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('csv')
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadCsv(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.handleCsvUpload(file);
  }
}

/*

Father God, Thank you for the oppurtunity. 
I am really blessed lord. 
Thank you for being with me, 
Guiding my every step,
Blessing me with abundance,
And Every tiny desire of my heart, 
YOU ARE THE ONE TRUE GOD. 

THE ONE AND ONLY HIGHER BEING, 

Thank you for EXISTING and thank you for making my life sucha a 
WOnderful place to live in





*/
