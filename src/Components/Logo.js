import { Link } from "react-router-dom";

function Logo({ logoSrc, altText, className = "" }) {
  return (
    <Link to="/" className="block">
      <img src={logoSrc} alt={altText} className={className} />
    </Link>
  );
}

export default Logo;
