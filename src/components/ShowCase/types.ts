interface CardResult {
  id: string;
  name: string;
  imageUrl: string;
}

type ResponseError = { message: string } | null;
type ResponseResult = Array<CardResult> | [];

export type { ResponseError, ResponseResult };
