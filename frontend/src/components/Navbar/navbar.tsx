import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

interface NavbarProps {
    handleDrawerOpen: () => void;
    open: boolean;
}

export default function Navbar({ handleDrawerOpen, open }: NavbarProps) {
    const drawerWidth = 250;

    interface AppBarProps {
        open?: boolean;
    }

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
    })<AppBarProps>(({ theme, open }) => ({
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    return (
        <AppBar position="fixed" open={open} sx={{ p: 0 }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                    <MenuIcon /> {/*ready for epizode 3 where we will add sidebar */}
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    This is my map App
                </Typography>
            </Toolbar>
        </AppBar>
    );
}