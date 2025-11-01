import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import CreditCardIcon from '@mui/icons-material/CreditCard';

type Anchor = 'left';

interface NavbarProps {
    onDrawerChange: (open: boolean) => void;
}

export default function SwipeableTemporaryDrawer({ onDrawerChange }: NavbarProps) {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
                onDrawerChange(open);
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: 250,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
            role="presentation"
        >
            {/* Menu lateral ampliado, com todas as informações */}
            <List>
                <Button onClick={toggleDrawer('left', false)}><ChevronLeftIcon /></Button>
                {[
                    { text: 'Login', icon: <LoginIcon /> }
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[
                    { text: 'Pesquisar', icon: <SearchIcon /> },
                    { text: 'Favoritos', icon: <FavoriteIcon /> },
                    { text: 'Pontos de recarga', icon: <CreditCardIcon /> }
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[
                    { text: 'Suporte', icon: <SupportAgentIcon /> },
                    { text: 'Ajuda', icon: <HelpIcon /> }
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {/* Versão no final do drawer */}
            <Box sx={{
                marginTop: 'auto',
                padding: 2,
                textAlign: 'center'
            }}>
                <ListItemText
                    primary="Versão 0.1.1"
                    primaryTypographyProps={{
                        fontSize: '0.875rem',
                        color: 'text.secondary'
                    }}
                />
            </Box>
        </Box>
    );

    return (
        <Box sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            zIndex: 1200,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            boxShadow: 2,
            width: 64
        }}>
            <React.Fragment key="left">
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                    <Button onClick={toggleDrawer('left', true)}><MenuIcon /></Button>
                </Box>
                <List sx={{ padding: 0 }}>
                    {[
                        { icon: <LoginIcon /> }
                    ].map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton sx={{
                                justifyContent: 'center',
                                px: 2.5
                            }}>
                                <ListItemIcon sx={{
                                    minWidth: 0,
                                    justifyContent: 'center'
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List sx={{ padding: 0 }}>
                    {[
                        { icon: <SearchIcon /> },
                        { icon: <FavoriteIcon /> },
                        { icon: <CreditCardIcon /> }
                    ].map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton sx={{
                                justifyContent: 'center',
                                px: 2.5
                            }}>
                                <ListItemIcon sx={{
                                    minWidth: 0,
                                    justifyContent: 'center'
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List sx={{ padding: 0 }}>
                    {[
                        { icon: <SupportAgentIcon /> },
                        { icon: <HelpIcon /> }
                    ].map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton sx={{
                                justifyContent: 'center',
                                px: 2.5
                            }}>
                                <ListItemIcon sx={{
                                    minWidth: 0,
                                    justifyContent: 'center'
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                {/* Versão fixada no final */}
                <Box sx={{
                    marginTop: 'auto',
                    padding: 1,
                    textAlign: 'center'
                }}>
                    <ListItemText
                        primary="v0.1.1"
                        primaryTypographyProps={{
                            fontSize: '0.75rem',
                            color: 'text.secondary'
                        }}
                    />
                </Box>

                <Drawer
                    anchor="left"
                    open={state.left}
                    onClose={toggleDrawer('left', false)}
                    variant="persistent"
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </Box>
    );
}