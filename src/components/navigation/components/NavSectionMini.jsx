import { Box, List, Stack } from "@mui/material";
import NavList from "./NavList";

function NavSectionMini({ data, user }) {
  return (
    <Stack alignItems='center'>
      {data.map((group, index) => {
        if (group.roles && !group.roles.includes(user?.package)) {
          return null;
        }
        return (
          <List key={index} disablePadding sx={{ px: 2 }}>
            {group.items.map((list) => (
              <NavList key={list.title + list.path} data={list} layout='mini' />
            ))}

            {data.length - 1 !== index && (
              <Stack alignItems='center'>
                <Box
                  sx={{
                    width: 24,
                    height: "1px",
                    bgcolor: "divider",
                    my: "8px !important",
                  }}
                />
              </Stack>
            )}
          </List>
        );
      })}
    </Stack>
  );
}

export default NavSectionMini;
