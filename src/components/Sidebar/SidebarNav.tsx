import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from "react-icons/ri";
import NavLink from "./NavLink";
import NavSection from "./NavSection";

export default function SidebarNav() {
  return (
    <Stack spacing='12' align='flex-start' >

      <NavSection title={"GERAL"} >
        <NavLink icon={RiDashboardLine} children={'Dashboard'} linkNavigation={"/dashboard"} />
        <NavLink icon={RiContactsLine} children={'Usuário'} linkNavigation={"/users"} />
      </NavSection>

      <NavSection title={"AUTOMAÇÃO"} >
        <NavLink icon={RiInputMethodLine} children={"Formulários"} linkNavigation={"/forms"} />
        <NavLink icon={RiGitMergeLine} children={"Automação"} linkNavigation={"/automation"} />
      </NavSection>
    </Stack>
  )
}
