import { IsBoolean, IsOptional } from 'class-validator';

export class OnOffParameters {
  @IsBoolean()
  @IsOptional()
  split = false;
}
