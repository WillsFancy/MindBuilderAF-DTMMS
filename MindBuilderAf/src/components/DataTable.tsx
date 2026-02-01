import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface DataTableProps<T> {
  title?: string;
  description?: string;
  data: T[];
  columns: {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
  }[];
  onRowClick?: (item: T) => void;
  viewAllLink?: string;
  onViewAll?: () => void;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  title,
  description,
  data,
  columns,
  onRowClick,
  viewAllLink,
  onViewAll,
  emptyMessage = 'No data available',
  className
}: DataTableProps<T>) {
  return (
    <Card className={cn('border border-border', className)}>
      {(title || onViewAll) && (
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            {title && <CardTitle className="font-heading text-lg">{title}</CardTitle>}
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
          {onViewAll && (
            <Button variant="ghost" size="sm" onClick={onViewAll} className="text-primary">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </CardHeader>
      )}
      <CardContent className={!title ? 'pt-6' : ''}>
        {data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {columns.map((col, idx) => (
                    <th 
                      key={idx}
                      className={cn(
                        'text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4',
                        col.className
                      )}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.map((item, rowIdx) => (
                  <tr 
                    key={rowIdx}
                    className={cn(
                      'table-row-hover',
                      onRowClick && 'cursor-pointer'
                    )}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((col, colIdx) => (
                      <td 
                        key={colIdx}
                        className={cn('py-3 px-4 text-sm', col.className)}
                      >
                        {col.render 
                          ? col.render(item) 
                          : String(item[col.key as keyof T] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
