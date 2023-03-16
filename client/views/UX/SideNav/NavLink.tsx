import React, { forwardRef, ForwardedRef, ForwardRefRenderFunction } from "react";
import { Link, LinkProps } from "react-router-dom";

const NavLink: ForwardRefRenderFunction<HTMLAnchorElement, LinkProps> = ({ to, children, ...rest }, ref) => (
  <Link ref={ref} to={to} {...rest}>
    {children}
  </Link>
);

export default forwardRef(NavLink);
