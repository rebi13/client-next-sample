import { Board } from '@/@types';
import apiRequest from '@/api';

const Detail = async (props: { params: { id: string } }) => {
  const board: Board = await apiRequest.requestApi(
    'get',
    `boards/${props.params.id}`
  );
  return (
    <>
      <h2>{board.title}</h2>
      <h4>{board.content}</h4>
    </>
  );
};

export default Detail;
