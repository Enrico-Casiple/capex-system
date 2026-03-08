'use client';
import { UserFindAll } from '@/lib/api/user.api';
import { Query, UserPageInput } from '@/lib/types/generated/types';
import { useQuery } from '@apollo/client/react';

const Home = () => {
  const findAll = useQuery<
    { UserFindAll: Query['UserFindAll'] },
    { paginationInput: UserPageInput }
  >(UserFindAll, {
    variables: {
      paginationInput: {
        currentPage: 1,
        pageSize: 10,
        isActive: true,
      },
    },
  });
  return <div>{JSON.stringify(findAll.data?.UserFindAll?.__typename, null, 2)}</div>;
};

export default Home;
