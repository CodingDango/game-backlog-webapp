import { Button, ButtonProps } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface AppButtonProps extends ButtonProps {
  isLoading?: boolean;
  icon?: React.ReactNode;
  loadingText?: string;
}

export default function AppButton({
  children,
  icon,
  className,
  loadingText,
  isLoading = false,
  ...props
}: AppButtonProps) {
  return (
    <Button className={className} disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <Spinner />
          {loadingText}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Button>
  );
}
