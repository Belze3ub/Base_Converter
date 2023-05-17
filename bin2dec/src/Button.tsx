interface Props {
  color: string;
  children: string;
  className: string;
  onClick?: () => void;
}

const Button = ({color, children, className, onClick}: Props) => {
  return <button className={className} style={{backgroundColor: color}} color={color} onClick={onClick}>{children}</button>;
}
export default Button