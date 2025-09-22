import { List, ListSubheader, Stack, styled } from "@mui/material";
import NavList from "./NavList";

// ----------------------------------------------------------------------

const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  fontSize: 11,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function NavSectionVertical({ data, user, onCloseNav }) {
  return (
    <Stack>
      {data.map((group) => {
        if (group.roles && !group.roles.includes(user?.role)) {
          return null;
        }
        const key = group.subheader || group.items[0].title;
        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{group.subheader}</StyledSubheader>
            )}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                layout='vertical'
                onCloseNav={onCloseNav}
              />
            ))}
          </List>
        );
      })}
    </Stack>
  );
}
