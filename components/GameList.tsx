import { ReactNode } from "react"

interface Props {
  children: ReactNode;
  isLoading: boolean;
};

export default function GameList({children, isLoading}: Props) {
  return (
    <div className="w-full grid grid-cols-3 gap-6">
      {!isLoading && children}
      {isLoading && (<div>Loading...</div>)}
    </div>
  )
}
