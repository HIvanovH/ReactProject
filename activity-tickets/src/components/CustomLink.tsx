import { Link } from "react-router-dom";

interface CustomLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, className, children }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};
export default CustomLink;
export {};
