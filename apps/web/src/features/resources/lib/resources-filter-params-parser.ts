import { parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs';
import type { ResourcesFilterParams } from '../api/get-resources';
import { deepRemoveNullUndefined } from '@/utils/object';

export const searchParamsParser = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  sort: parseAsString,
  title: parseAsString,
  q: parseAsString,
  category: parseAsArrayOf(parseAsString),
  resourceType: parseAsArrayOf(parseAsString),
  fileFormat: parseAsArrayOf(parseAsString),
  yearFrom: parseAsInteger,
  yearTo: parseAsInteger,
};

export function parseResourcesFilters(params: URLSearchParams): ResourcesFilterParams {
  const entries = Object.fromEntries(params.entries());

  return deepRemoveNullUndefined({
    page: searchParamsParser.page.parseServerSide(entries.page),
    pageSize: searchParamsParser.pageSize.parseServerSide(entries.pageSize),
    sort: searchParamsParser.sort.parseServerSide(entries.sort),
    title: searchParamsParser.title.parseServerSide(entries.title),
    q: searchParamsParser.q.parseServerSide(entries.q),
    category: searchParamsParser.category.parseServerSide(entries.category),
    resourceType: searchParamsParser.resourceType.parseServerSide(entries.resourceType),
    fileFormat: searchParamsParser.fileFormat.parseServerSide(entries.fileFormat),
    yearFrom: searchParamsParser.yearFrom.parseServerSide(entries.yearFrom),
    yearTo: searchParamsParser.yearTo.parseServerSide(entries.yearTo),
  });
}
