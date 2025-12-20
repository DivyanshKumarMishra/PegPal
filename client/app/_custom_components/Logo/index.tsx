import Link from 'next/link';

type LogoProps = {
  className?: string;
};

function AppLogo({ className }: LogoProps = { className: '' }) {
  return (
    <Link
      href="/"
      className={`font-logo text-4xl font-bold text-accent tracking-wide transition-all duration-300 hover:text-accent/90 whitespace-nowrap ${className}`}
    >
      PegPal
    </Link>
  );
}

export default AppLogo;
