import { useNavigate } from '@remix-run/react';
import { CreateTask } from '../modules/Boards/CreateTask/CreateTask';

export default function BoardTaskCreateRoute() {
  const navigate = useNavigate();
  const onClose = () => {
    navigate('../');
  };
  return <CreateTask onClose={onClose} />;
}
