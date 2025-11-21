export type Message = {
  id: number;
  fromMe: boolean;
  text?: string;
  time: string;
  image?: string;
  file?: {
    name: string;
    size: number;
    url: string;
  };
  sticker?: string;
};
