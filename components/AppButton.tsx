import { Button, ButtonProps } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface AppButtonProps extends ButtonProps {
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export default function AppButton({
  children,
  icon,
  className,
  isLoading = false,
  ...props
}: AppButtonProps) {
  return (
    <Button className={className} disabled={isLoading} {...props}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Button>
  );
}
