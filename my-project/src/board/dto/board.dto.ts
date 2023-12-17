// import { OmitType } from '@nestjs/swagger';
import { MinLength, MaxLength } from 'class-validator';

export class CreateBoardDto {
  @MinLength(5)
  title: string;
  @MaxLength(200)
  content: string;
}

export class UpdateBoardDto extends CreateBoardDto {
  userId: number;
}
