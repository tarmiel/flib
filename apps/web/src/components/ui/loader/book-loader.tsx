import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const loaderVariants = cva('relative box-border', {
  variants: {
    size: {
      sm: 'w-[100px] h-[70px]',
      md: 'w-[200px] h-[140px]',
      lg: 'w-[300px] h-[210px]',
      xl: 'w-[400px] h-[280px]',
    },
    variant: {
      light: 'bg-gray-300',
      dark: 'bg-gray-700',
      primary: 'bg-[#979794]',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

export interface BookLoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string;
}

export const BookLoader = ({ size, variant, className }: BookLoaderProps) => {
  return (
    <div
      className={cn(
        loaderVariants({ size, variant }),
        'relative rounded-lg [perspective:1000px]',
        className,
      )}
    >
      <div
        className="absolute inset-[10px] rounded-lg bg-[#f5f5f5]
      bg-[linear-gradient(#ddd_100px,transparent_0),linear-gradient(#ddd_100px,transparent_0),linear-gradient(#ddd_100px,transparent_0),linear-gradient(#ddd_100px,transparent_0),linear-gradient(#ddd_100px,transparent_0),linear-gradient(#ddd_100px,transparent_0)]
      bg-no-repeat
      shadow-[0_0_10px_rgba(0,0,0,0.25)]
      [background-size:60px_10px]
      [background-position:15px_30px,15px_60px,15px_90px,105px_30px,105px_60px,105px_90px]"
      ></div>

      <div
        className="absolute w-[calc(50%-10px)] right-[10px] top-[10px] bottom-[10px] rounded-lg
      bg-white bg-no-repeat
      [background-size:60px_10px]
      [background-image:linear-gradient(#ddd_100px,transparent_0),linear-gradient(#ddd_100px,transparent_0),linear-gradient(#ddd_100px,transparent_0)]
      [background-position:50%_30px,50%_60px,50%_90px]
      origin-left
      animate-[paging_1s_linear_infinite]"
      ></div>
    </div>
  );
};
