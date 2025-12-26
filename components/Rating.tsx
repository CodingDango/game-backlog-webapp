'use client';

import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';

interface Props {
  onValueChange: (rating: number) => void;
  value: number;
}

const RatingSelector = ({onValueChange, value}: Props) => (
  <Rating {...{value, onValueChange}}>
    {Array.from({ length: 5 }).map((_, index) => (
      <RatingButton key={index} />
    ))}
  </Rating>
);
export default RatingSelector;