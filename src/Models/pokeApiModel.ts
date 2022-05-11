interface IResult {
  name: string;
  url: string;
}

export interface PokeApiResult {
  count: number;
  next: string;
  previous: string;
  results: IResult[];
}
