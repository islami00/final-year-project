import { token, type ColorToken } from '@tma/design-system';
import { z } from 'zod';
import { AppValidationError } from '../utils/AppValidationError';
import Converter from './Converter.model';
import { ZodOf } from './types';

export const StatusColor = {
  BLUE: 'blue.6',
  GRAY: 'gray.6',
  GREEN: 'green.6',
  RED: 'red.6',
} as const;

export type StatusColorDict = typeof StatusColor;
export type StatusColorOptions = StatusColorDict[keyof StatusColorDict];

export interface StatusCreatePartial {
  name: string;
  color: StatusColorOptions;
}
export interface StatusCreate extends StatusCreatePartial {
  order: number;
  boardId: string;
}

export type StatusApi = Status;
export interface Status {
  id: string;
  name: string;
  color: ColorToken;
  order: number;
  boardId: string;
}

// const statusSchema:
export interface StatusListWithDefault {
  defaultStatus: Status;
  allStatuses: Status[];
}

const statusSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  color: z
    .string()
    .refine((v): v is ColorToken =>
      Boolean(token(`colors.${v as ColorToken}`))
    ),
  order: z.number(),
  boardId: z.string().min(1),
}) satisfies ZodOf<Status>;
class StatusConverter extends Converter<StatusApi, Status> {
  static $self = new StatusConverter();

  fromApi(from: Status): Promise<Status> {
    return statusSchema.parseAsync(from);
  }

  async fromArrayWithDefault(
    from: StatusApi[]
  ): Promise<StatusListWithDefault> {
    const { $self } = StatusConverter;
    const allStatuses = await $self.fromArrayApi(from);
    const first = allStatuses.find((each) => each.order === 0);
    if (!first) {
      throw new AppValidationError('Missing default status');
    }

    return {
      defaultStatus: first,
      allStatuses: allStatuses,
    };
  }
}

export default new StatusConverter();
