import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto, UpdateBoardDto } from './dto/board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Board } from 'src/entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}
  private boardArray = Array.from({ length: 8 }).map((el, idx: number) => ({
    id: idx,
    title: `title ${idx}`,
    content: `content ${idx}`,
  }));

  async findAll() {
    return this.boardRepository.find();
  }

  async find(id: number) {
    try {
      return this.boardRepository.findOne({
        where: {
          userId: id,
        },
        relations: {
          user: true,
        },
      });
    } catch (err) {
      throw new HttpException(
        'the element was not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: CreateBoardDto) {
    return this.boardRepository.save(data);
  }

  async edit({ userId, title, content }: UpdateBoardDto) {
    const idx = this.boardArray.findIndex((board) => board.id === userId);
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
