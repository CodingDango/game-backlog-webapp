'use client';

import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';

interface Props {
  onValueChange?: (rating: number) => void;
  value?: number;
  readOnly?: boolean;
  wrapperClassName?: string;
  buttonClassName?: string;
  starSize?: number;
}

const RatingSelector = ({onValueChange, value, readOnly, wrapperClassName, buttonClassName, starSize}: Props) => (
  <Rating {...{value, onValueChange, readOnly}} className={wrapperClassName}>
    {Array.from({ length: 5 }).map((_, index) => (
      <RatingButton key={index} className={buttonClassName} size={starSize}/>
    ))}
  </Rating>
);
export default RatingSelector;