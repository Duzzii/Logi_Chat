// chat.model.ts
export interface Chat {
    id?: number;
    sender: string;
    content: string;
    groupCode: string;
    timestamp?: Date;
  }
  