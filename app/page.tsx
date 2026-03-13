'use client';
import { UserFindAll, UserFindAllSubscription } from '@/lib/api/user.api';
import { Query, UserPageInput } from '@/lib/types/generated/types';
import { useQuery, useSubscription } from '@apollo/client/react';

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

  useSubscription(UserFindAllSubscription, {
    onData: ({ data }) => {
      console.log('📡 Subscription update received:', data.data);
    },
    onError: (error) => {
      console.log('❌ Subscription error:', error);
    },
  });
  return <div>{JSON.stringify(findAll.data?.UserFindAll?.__typename, null, 2)}</div>;
};

export default Home;
