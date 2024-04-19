import { Card } from '@mantine/core';
import { Board } from '../../../../models/Board.model';
import * as classes from './BoardList.styles';
import { Link, generatePath } from '@remix-run/react';
import { routeConfig } from '../../../../utils/routeConfig';

export interface BoardListProps {
  boards: Board[];
  orgId: string;
}

export function BoardList(props: BoardListProps) {
  const { boards, orgId } = props;
  return (
    <>
      {boards.map((each) => (
        <Card
          className={classes.card}
          component={Link}
          to={generatePath(routeConfig.board.param, {
            boardId: each.id,
            orgId,
          })}
        >
          {each.name}
        </Card>
      ))}
    </>
  );
}
