import { Prisma } from '../generated/prisma/client';
import { getDatamodel } from '../pothos/pothos-prisma-types';
import createCrudGQL from './createCrudGQL';
import { fragments } from './fragments.ts';

const prismaDataModel = getDatamodel();

type CrudGQLInstance = ReturnType<typeof createCrudGQL>;

// ─── Auto-generate all CrudGQL instances ──────────────────────
export const crudGQL = Object.fromEntries(
  Object.keys(prismaDataModel.datamodel.models).map((modelName) => {
    const { fragment, fragmentName } = fragments[modelName];
    return [modelName, createCrudGQL({ entity: modelName, fragment, fragmentName })];
  }),
) as Record<Prisma.ModelName, CrudGQLInstance>;

// ─── Type-safe named accessor ──────────────────────────────────
type ModelGQLMap = { [K in Prisma.ModelName as `${K}GQL`]: CrudGQLInstance };

export const modelGQL = new Proxy({} as ModelGQLMap, {
  get(_target, prop: string) {
    const modelName = prop.replace(/GQL$/, '') as Prisma.ModelName;
    return crudGQL[modelName];
  },
});

// How wse can use the modelGQL in a component
// 'use client';

// import { modelGQL } from '@/lib/api/crud.gql';
// import { Query, Subscription, UserCursorPaginationInput } from '@/lib/generated/api/graphql';
// import { useQuery, useSubscription } from '@apollo/client/react';
// import { useState } from 'react';

// const modelAPI = modelGQL;

// const Home = () => {
//   const [cursor, setCursor] = useState<string | null>(null);
//   const [cursorStack, setCursorStack] = useState<string[]>([]);
//   const [page, setPage] = useState(1);

//   const { data, loading } = useQuery<
//     { UserFindAllWithCursor: Query['UserFindAllWithCursor'] },
//     { cursorInput: UserCursorPaginationInput }
//   >(modelAPI.UserGQL.findAllWithCursor, {
//     variables: { cursorInput: { cursor, isActive: true, take: 5 } },
//   });

//   useSubscription<{ UserSubscription: Subscription['UserSubscription'] }>(
//     modelAPI.UserGQL.subscription,
//     {
//       onData({ client, data }) {
//         const newData = data.data?.UserSubscription;
//         client.cache.modify({
//           fields: {
//             UserFindAllWithCursor(existing) {
//               return { ...existing, data: [newData, ...(existing?.data ?? [])] };
//             },
//           },
//         });
//       },
//     },
//   );

//   const result = data?.UserFindAllWithCursor;
//   const rows = result?.data ?? [];
//   const hasNextPage = result?.hasNextPage ?? false;
//   const hasPrevPage = cursorStack.length > 0;

//   const handleNext = () => {
//     if (!hasNextPage || !result?.nextCursor) return;
//     setCursorStack((prev) => [...prev, cursor ?? '']);
//     setCursor(result.nextCursor);
//     setPage((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     if (!hasPrevPage) return;
//     const stack = [...cursorStack];
//     const prevCursor = stack.pop() ?? null;
//     setCursorStack(stack);
//     setCursor(prevCursor);
//     setPage((prev) => prev - 1);
//   };

//   return (
//     <div>
//       {/* ─── Table ─────────────────────────────────────── */}
//       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Username</th>
//             <th>Active</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan={5} style={{ textAlign: 'center' }}>
//                 Loading...
//               </td>
//             </tr>
//           ) : rows.length === 0 ? (
//             <tr>
//               <td colSpan={5} style={{ textAlign: 'center' }}>
//                 No records found
//               </td>
//             </tr>
//           ) : (
//             rows.map((user) => (
//               <tr key={user?.id}>
//                 <td>{user?.name}</td>
//                 <td>{user?.email}</td>
//                 <td>{user?.userName}</td>
//                 <td>{user?.isActive ? 'Yes' : 'No'}</td>
//                 <td>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* ─── Pagination ────────────────────────────────── */}
//       <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
//         <button onClick={handlePrev} disabled={!hasPrevPage || loading}>
//           ← Prev
//         </button>
//         <span>{page}</span>
//         <button onClick={handleNext} disabled={!hasNextPage || loading}>
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;
