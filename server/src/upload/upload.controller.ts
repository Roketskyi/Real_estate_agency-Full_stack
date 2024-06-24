import { Body, Controller, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { UserService } from 'src/user/user.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly userService: UserService) {}

  @Post('apartment')
  @UseInterceptors(FileInterceptor('file'))
  async uploadApartmentFile(@UploadedFile() file) {
    const uniqueFileName = uuidv4() + extname(file.originalname);
    const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'apartments');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, uniqueFileName);

    try {
      fs.writeFileSync(uploadPath, file.buffer);
      const imageUrl = `http://localhost:4000/uploads/apartments/${uniqueFileName}`;
      return { imageUrl };
    } catch (error) {
      console.error('Помилка при завантаженні файлу:', error);
      throw new Error('Помилка завантаження');
    }
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatarFile(@UploadedFile() file) {
    const uniqueFileName = uuidv4() + extname(file.originalname);
    const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'avatars');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, uniqueFileName);

    try {
      fs.writeFileSync(uploadPath, file.buffer);
      const imageUrl = `http://localhost:4000/uploads/avatars/${uniqueFileName}`;
      return { imageUrl };
    } catch (error) {
      console.error('Помилка при завантаженні файлу:', error);
      throw new Error('Помилка завантаження');
    }
  }

  @Patch(':id/avatar')
  async updateAvatar(@Param('id') id: number, @Body() updateUserInput: UpdateUserInput) {
    return this.userService.update(id, updateUserInput);
  }
}
