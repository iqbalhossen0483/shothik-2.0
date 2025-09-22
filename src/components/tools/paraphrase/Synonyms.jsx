import { ChevronRight } from "@mui/icons-material";
import { List, ListItemButton, ListItemText, Popper } from "@mui/material";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

export default function Synonyms({
  synonyms,
  open,
  handleClose,
  anchorEl,
  replaceSynonym,
}) {
  const ref = useOutsideClick(() => handleClose());

  return (
    <Popper
      anchorEl={anchorEl}
      placement='bottom-start'
      ref={ref}
      open={open}
      onClose={handleClose}
      sx={{ zIndex: 500 }}
    >
      <List
        sx={{
          minWidth: 200,
          bgcolor: "background.paper",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 22px 0px",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
      >
        {synonyms.length
          ? synonyms?.map((synonym, index) => (
              <ListItemButton
                onClick={() => replaceSynonym(synonym)}
                key={`item-${index}`}
                sx={{
                  py: 0,
                  px: "12px",
                  minHeight: 32,
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  "&:hover .arrow-icon": {
                    display: "block",
                  },
                }}
              >
                <ListItemText sx={{}} primary={`${synonym}`} />
                <ChevronRight
                  className='arrow-icon'
                  sx={{ display: "none", color: "text.secondary" }}
                />
              </ListItemButton>
            ))
          : null}
      </List>
    </Popper>
  );
}
