import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import logo from "../img/logo-short.png";
import headerBg from "../img/header_bg.jpg";

const HeaderContainer = styled(AppBar)`
  background-image: url(${headerBg});
  background-position: center;
  background-repeat: no-repeat;
  color: #1b1f56;
  box-shadow: none;
  position: relative;
  z-index: 1;
	height: 110px;
`;

const Overlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(192, 192, 192, 0.81);
  z-index: -1;
`;

const Toolbar2 = styled(Toolbar)`
	display: flex;
	justify-content: space-between;
	height: 100%;
	disableGutters: true;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer position="static">
      <Overlay />
      <Toolbar2>
        <Box sx={{ display: "flex", alignItems: "center" }} width="70%">
          <img src={logo} alt="Logo" style={{ height: 50 }} />
          <p style={{ textAlign: "center", fontWeight: "bold", width: "90%", fontSize: 30 }}>
            CẢNG CONTAINER QUỐC TẾ HATECO HẢI PHÒNG
          </p>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "white", paddingLeft: "30px", paddingRight: "30px", justifyContent: "space-between"}} height="100%">
					<Box sx={{ display: "flex", alignItems: "center" }} bgcolor={`#1b1f56`}>
						<IconButton size="large" sx={{ color: "white", padding: "20px" }} >
							<HomeIcon />
						</IconButton>
					</Box>					
					<Box sx={{ display: "flex", alignItems: "center" }} bgcolor={`#1b1f56`}>
						<IconButton size="large" sx={{ color: "white", padding: "20px" }} >
							<MenuIcon />
							<Typography variant="body1" sx={{ paddingLeft: 4, paddingRight: 4, color: "white" }}>
								Danh mục kích cỡ
							</Typography>
						</IconButton>
					</Box>
          <IconButton size="large" color="inherit" sx={{padding: "20px" }}>
            <PhoneIcon />
          </IconButton>
          <IconButton size="large" color="inherit" sx={{padding: "20px" }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar2>
    </HeaderContainer>
  );
};

export default Header;
