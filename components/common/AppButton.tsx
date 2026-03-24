import { Button, ButtonProps } from "../ui/button";
import { Spinner } from "../ui/spinner";

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
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <Button {...props} className={className} disabled={isLoading || disabled}>
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
