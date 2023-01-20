import React from "react";

import { Menu as MenuMUI } from '@mui/material';

interface MenuProps {
    id: string;
    children: any;
    anchorElUser: HTMLElement | null;
    closeUserMenu: () => void;
}

const Menu: React.FunctionComponent<MenuProps> = (props) => {
    const { id, children, anchorElUser, closeUserMenu } = props;

    return <MenuMUI
        sx={{
            mt: '75px',
            ".MuiPopover-paper": {
                border: '8px solid #1EA4CE'
            }
        }}
        id={id}
        anchorEl={anchorElUser}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={closeUserMenu}
    >
        {children}
    </MenuMUI>
}

export default Menu;