import { parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs';
import * as z from 'zod';

import { ROLES } from '@/lib/authorization';
import type { UserFilterParams } from '../api/get-users';

export const searchParamsParser = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  role: parseAsArrayOf(z.enum([ROLES.ADMIN, ROLES.EDITOR, ROLES.USER])).withDefault([]),
  firstName: parseAsString.withDefault(''),
};

export const parseUsersFilters = (params: URLSearchParams): UserFilterParams => {
  const entries = Object.fromEntries(params.entries());
  return {
    page: searchParamsParser.page.parseServerSide(entries.page),
    pageSize: searchParamsParser.pageSize.parseServerSide(entries.pageSize),
    role: searchParamsParser.role.parseServerSide(entries.role),
    firstName: searchParamsParser.firstName.parseServerSide(entries.firstName),
  };
};
