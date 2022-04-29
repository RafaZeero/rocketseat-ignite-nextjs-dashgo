import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
//contexts
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

//components
import Logo from "./Logo";
import { NotificationNav } from "./NotificationNav";
import { Profile } from "./Profile";
import SearchBox from "./SearchBox";


export function Header() {
  const { onOpen } = useSidebarDrawer()

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
    <Flex
      as='header'
      w='100%'
      maxWidth={1480}
      h='20'
      mx='auto'
      mt='4'
      px='6'
      align='center'
    >
      {!isLargeScreen && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize='24'
          variant='unstyled'
          onClick={onOpen}
          mr='2'
        >

        </IconButton>
      )}
      <Logo />
      {isLargeScreen && <SearchBox />}


      <Flex align='center' ml='auto'>
        <NotificationNav />
        <Profile showProfileData={isLargeScreen} />
      </Flex>

    </Flex>
  )
}
