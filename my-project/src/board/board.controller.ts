import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findAll() {
    return await this.boardService.findAll();
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    return await this.boardService.find(id);
  }

  @Post()
  async create(@Body(new ValidationPipe()) data: CreateBoardDto) {
    return await this.boardService.create(data);
  }

  @Put(':id')
  async edit(
    @Param('id', ParseIntPipe) userId: number,
    @Body() data: UpdateBoardDto,
  ) {
    return await this.boardService.edit({
      userId,
      title: data.title || null,
      content: data.content || null,
    });
  }
}
