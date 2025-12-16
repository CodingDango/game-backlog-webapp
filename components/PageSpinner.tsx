import { Spinner } from "./ui/spinner";

export default function PageSpinner() {
  return (
    <div className="absolute h-full w-full grid place-items-center">
      <Spinner className="size-12"/>
    </div>
  )
}
