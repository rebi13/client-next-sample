import Link from 'next/link';
import apiRequest from '@/api';
import { Board } from '@/@types';

const List = async () => {
  const boards: Board[] = await apiRequest.requestApi('get', 'boards');

  return (
    <>
      <ol>
        {boards.map((board) => {
          return (
            <li key={board._id}>
              <Link href={`/detail/${board._id}`}>{board.title}</Link>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default List;
