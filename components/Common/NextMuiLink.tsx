import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import Link, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

type NextMuiLinkProps = Omit<MuiLinkProps, "href" | "component"> & NextLinkProps;

const NextMuiLink = React.forwardRef<HTMLAnchorElement, NextMuiLinkProps>(
  function NextMuiLink(props, ref) {
    const { href, ...muiProps } = props;

    return (
      <MuiLink
        component={Link}
        href={href}
        ref={ref}
        {...muiProps}
      />
    );
  }
);

NextMuiLink.displayName = "NextMuiLink";

export default NextMuiLink;
