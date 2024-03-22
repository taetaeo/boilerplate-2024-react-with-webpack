import { type Ref, type PropsWithChildren, forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
}

type Props = PropsWithChildren<ButtonProps>;

const ButtonDefault = forwardRef(function Button({ disabled = false, children, ...rest }: Props, forwardedRef: Ref<HTMLButtonElement>) {
  return (
    <button ref={forwardedRef} disabled={disabled} {...rest}>
      {children}
    </button>
  );
});
export default ButtonDefault;
