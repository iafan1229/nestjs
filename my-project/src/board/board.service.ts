import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  private boardArray = Array.from({ length: 8 }).map((el, idx: number) => ({
    id: idx,
    title: `title ${idx}`,
    content: `content ${idx}`,
  }));

  findAll() {
    return this.boardArray;
  }

  find(id: number) {
    const idx = this.boardArray.findIndex((el) => el.id === Number(id));
    console.log(idx);
    return this.boardArray[idx];
  }

  create({ title, content }) {
    const lastIdx = this.boardArray.length;
    return (this.boardArray[lastIdx] = {
      id: lastIdx,
      title,
      content,
    });
  }

  edit({ id, title, content }) {
    const idx = this.boardArray.findIndex((board) => board.id === Number(id));
    return (this.boardArray[idx] = {
      id: idx,
      title: title === null ? this.boardArray[idx].title : title,
      content: content === null ? this.boardArray[idx].content : content,
    });
  }
}
