import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  private boardArray = Array.from({ length: 8 }).map((el, idx: number) => ({
    id: idx,
    title: `title ${idx}`,
    content: `content ${idx}`,
  }));

  async findAll() {
    return this.boardArray;
  }

  async find(id: number) {
    const idx = this.boardArray.findIndex((el) => el.id === id);
    if (idx !== -1) {
      return this.boardArray[idx];
    } else {
      throw new HttpException(
        'the element was not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create({ title, content }: CreateBoardDto) {
    const lastIdx = this.boardArray.length;
    return (this.boardArray[lastIdx] = {
      id: lastIdx,
      title,
      content,
    });
  }

  async edit({ id, title, content }: UpdateBoardDto) {
    const idx = this.boardArray.findIndex((board) => board.id === id);
    if (idx !== -1) {
      return (this.boardArray[idx] = {
        id: idx,
        title: title === null ? this.boardArray[idx].title : title,
        content: content === null ? this.boardArray[idx].content : content,
      });
    } else {
      throw new HttpException(
        'the element was not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: number) {
    const idx = this.boardArray.findIndex((board) => board.id === id);
    if (idx !== -1) {
      return this.boardArray.filter((el) => el.id !== idx);
    } else {
      throw new HttpException(
        'the element was not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
