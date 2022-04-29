import { ElementType } from "react";
import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";

import ActiveLink from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType
  children: string
  linkNavigation: string
}

export default function NavLink({ icon, children, linkNavigation, ...props }: NavLinkProps) {
  return (
    <ActiveLink href={linkNavigation} passHref>
      <ChakraLink display='flex' alignItems='center' {...props} >
        <Icon as={icon} fontSize='20' />
        <Text ml='4' fontWeight='medium' >{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}
