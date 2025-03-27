// import { DataTableSkeleton } from '@/components/ui/data-table';
import { UsersTable } from '@/features/users/components/users-table';

import { parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs';
import * as z from 'zod';

import { ROLES } from '@/lib/authorization';
import { getSortingStateParser } from '@/lib/parsers';
import type { User } from '@/types/api';

export const searchParamsParser = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<User>().withDefault([{ id: 'createdAt', desc: true }]),
  role: parseAsArrayOf(z.enum([ROLES.ADMIN, ROLES.EDITOR, ROLES.USER])).withDefault([]),
  lastName: parseAsString.withDefault(''),
};

// Utility type to infer the parsed value from a parser instance
type InferParsedValue<T> = T extends { parseServerSide: (value: any) => infer U } ? U : never;

// Infer the UserFilters type based on the searchParamsParser keys
export type UserFilters = {
  [K in keyof typeof searchParamsParser]: InferParsedValue<(typeof searchParamsParser)[K]>;
};

const parseFilters = (params: URLSearchParams): UserFilters => {
  const entries = Object.fromEntries(params.entries());
  return {
    page: searchParamsParser.page.parseServerSide(entries.page),
    pageSize: searchParamsParser.pageSize.parseServerSide(entries.pageSize),
    sort: searchParamsParser.sort.parseServerSide(entries.sort),
    role: searchParamsParser.role.parseServerSide(entries.role),
    lastName: searchParamsParser.lastName.parseServerSide(entries.lastName),
  };
};

export default function UsersPage() {
  // const [searchParams] = useSearchParams();
  // const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  // console.log('searchParams', filters);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Управління користувачами</h1>
      </div>

      {/* <DataTableSkeleton
        columnCount={6}
        searchableColumnCount={1}
        filterableColumnCount={2}
        cellWidths={['10rem', '40rem', '12rem', '12rem', '8rem', '8rem']}
        shrinkZero
      /> */}

      <UsersTable />
    </div>
  );
}
