"use client";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

export default function NavButton({ sx = {}, clickAction, buttonText }) {
    return (
        <ListItem sx={sx} onClick={clickAction}>
            <ListItemButton>
                <ListItemText primary={buttonText} />
            </ListItemButton>
        </ListItem>
    );
}
