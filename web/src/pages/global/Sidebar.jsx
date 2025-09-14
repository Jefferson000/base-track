import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import { useSelector } from "react-redux";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        marginTop: "6px",
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("");
  const location = useLocation();

  // Get user from Redux state
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  console.log(`Company image: ${process.env.REACT_APP_IMAGE_BASE_URL}${user?.company_logo}`)
  useEffect(() => {
    // Set the selected state based on the current path
    const path = location.pathname;

    if (path === "/") {
      setSelected("Mi empresa");
    } else if (path.startsWith("/test")) {
      setSelected("Test");
    }
  }, [location]);
  return (
    <Box
      sx={{
        "& .pro-sidebar": {
          width: "210px",
          minWidth: "210px"
        },
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 10px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.greenAccent[400]} !important`
        },
        "& .pro-menu-item.active": {
          color: `${colors.greenAccent[400]} !important`,
        },
      }}
    >
      <ProSidebar>
        <Menu iconShape="square">
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="company-image"
                src={`${process.env.REACT_APP_IMAGE_BASE_URL}${user?.company_logo}`}
                style={{
                  width: "100%", 
                  maxWidth: "150px",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover"
                }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h3"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {user?.name}
              </Typography>
            </Box>
          </Box>

          <Box>
            {/* General Section with Dropdown */}
            <SubMenu
              title="General"
              defaultOpen={true}
            >
              <Item
                title="Mi empresa"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              
              <Box>
                <Item
                  title="Test"
                  to="/test"
                  icon={<PersonPinOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> 
              </Box>
            </SubMenu>

            {/* Test Section*/}
            <SubMenu
              title="Sub Menu Test"
              defaultOpen={true}
            >
              <Item
                title="Test"
                to="/test"
                icon={<PersonPinOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Test"
                to="/test"
                icon={<PersonPinOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
