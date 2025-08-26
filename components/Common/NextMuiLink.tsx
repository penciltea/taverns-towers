import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";

type NextMuiLinkProps = Omit<MuiLinkProps, "href"> & NextLinkProps & {
  underline?: MuiLinkProps["underline"];
};

const NextMuiLink = React.forwardRef<HTMLAnchorElement, NextMuiLinkProps>(
  function NextMuiLink(props, ref) {
    const { href, as, replace, scroll, shallow, prefetch, locale, ...muiProps } =
      props;

    return (
      <NextLink
        href={href}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        prefetch={prefetch}
        locale={locale}
        passHref
        legacyBehavior
      >
        <MuiLink ref={ref} {...muiProps} />
      </NextLink>
    );
  }
);

export default NextMuiLink;
