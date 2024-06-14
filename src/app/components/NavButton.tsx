"use client";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function NavButton({
    sx = {},
    clickAction,
    buttonText,
    controlsCollapse = false,
    collapseOpen = false,
}) {
    return (
        <ListItem sx={sx} onClick={clickAction}>
            <ListItemButton sx={{ background: "#D2DAFF", borderRadius: "5px" }}>
                <ListItemText primary={buttonText} />
                {controlsCollapse &&
                    (collapseOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
        </ListItem>
    );
}
