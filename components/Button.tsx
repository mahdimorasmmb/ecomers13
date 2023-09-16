import clsx from "clsx";
import { forwardRef } from "react";

interface ButtonOptions {
  /**
   * Button display variants
   * @default "solid"
   * @type ButtonVariant
   */
  variant?: ButtonVariant;
}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

type ButtonVariant = "outline" | "solid" | "ghost" | 'primary'

const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'btn-primary'
    case "outline":
      return "btn-outline";
    case "ghost":
      return "btn-ghost";
    default:
      return undefined;
  }
};

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    variant = "solid",
    type = "button",
    className,
    children,
    ...rest
  } = props;

  const merged = clsx("btn", getVariant(variant), className);

  return (
    <button ref={ref} className={merged} {...rest}>
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;