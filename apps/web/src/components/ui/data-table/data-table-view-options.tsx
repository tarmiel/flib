import type { Table } from '@tanstack/react-table';
import { Check, ChevronsUpDown, Settings2 } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, toSentenceCase } from '@/utils';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          aria-label="Toggle columns"
          variant="outline"
          role="combobox"
          size="sm"
          className="ml-auto hidden  lg:flex"
          onPointerDown={(event) => {
            /**
             * @see https://github.com/radix-ui/primitives/blob/main/packages/react/select/src/select.tsx#L281-L299
             */

            // prevent implicit pointer capture
            const target = event.target;
            if (!(target instanceof Element)) return;
            if (target.hasPointerCapture(event.pointerId)) {
              target.releasePointerCapture(event.pointerId);
            }

            if (event.button === 0 && event.ctrlKey === false && event.pointerType === 'mouse') {
              // prevent trigger from stealing focus from the active item
              event.preventDefault();
            }
          }}
        >
          <span className={'flex gap-1 items-center'}>
            <Settings2 className={'size-4'} />
            Фільтр
            <ChevronsUpDown className="size-4 ml-auto opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-44 p-0"
        onCloseAutoFocus={() => triggerRef.current?.focus({ preventScroll: true })}
      >
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
                .map((column) => {
                  return (
                    <CommandItem
                      key={column.id}
                      onSelect={() => column.toggleVisibility(!column.getIsVisible())}
                    >
                      <span className="truncate">{toSentenceCase(column.id)}</span>
                      <Check
                        className={cn(
                          'ml-auto size-4 shrink-0',
                          column.getIsVisible() ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
