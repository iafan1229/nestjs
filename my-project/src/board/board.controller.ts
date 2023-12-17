import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';

interface IData {
  id: number;
  title: string;
  content: string;
}

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.boardService.find(id);
  }

  @Post()
  create(@Body() data: any): IData {
    return this.boardService.create(data);
  }

  @Put(':id')
  edit(@Param('id') id: number, @Body() data: Partial<IData>) {
    return this.boardService.edit({
      id,
      title: data.title || null,
      content: data.content || null,
    });
  }
}
