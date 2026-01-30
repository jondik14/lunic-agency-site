import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  to, 
  href, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  onClick,
  fullWidth = false
}) => {
  const baseStyles = "inline-flex items-center justify-center font-sans transition-[opacity,transform,background-color,border-color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation";
  
  const variants = {
    primary: "bg-studio-accent text-white hover:bg-studio-accent/90 rounded-xl shadow-[0_2px_8px_rgba(69,153,254,0.25)] hover:shadow-[0_4px_12px_rgba(69,153,254,0.3)] transition-shadow",
    secondary: "bg-transparent border-2 border-studio-ink/40 text-studio-ink hover:bg-studio-ink/10 rounded-xl",
    outline: "bg-transparent border-2 border-studio-accent text-studio-accent hover:bg-studio-accent/10 rounded-xl",
    text: "text-studio-accent border-b border-studio-accent hover:text-studio-ink hover:border-studio-ink p-0 rounded-none font-sans font-bold"
  };

  const sizes = variant === 'text' ? 'text-sm' : "px-8 py-4";
  const fontSize = variant === 'text' ? 'text-sm' : "text-sm md:text-base";
  const width = fullWidth ? "w-full" : "";

  const classes = `${baseStyles} ${variants[variant]} ${sizes} ${fontSize} ${width} ${className}`;

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}</a>;
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;