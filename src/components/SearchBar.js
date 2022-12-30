import { useContext } from "react";

import { MusicPlayerContext } from "../context/MusicPlayerProvider";

import { useParams, useNavigate } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

// #region ------- Styling Search-Bar -------
const Search = styled("div")(({ theme }) => ({
  position: "absolute",
  right: "12%",
  top: "20px",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  right: "1rem",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 3),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "calc(100% - 1rem)",
    [theme.breakpoints.up("sm")]: {
      width: "24ch",
      "&:focus": {
        width: "32ch",
      },
    },
  },
}));
// #endregion ------- Styling Search-Bar -------

export default function SearchBar() {
  const { searchValue, setSearchValue } = useContext(MusicPlayerContext);

  const { value } = useParams();
  const navigate = useNavigate();

  const searchHandler = (e) => {
    const path = window.location.pathname;
    console.log(path);
    setSearchValue(e.target.value);
    if (path === "/search/") navigate(`/`);
    navigate(`/search/${e.target.value}`);
  };

  return (
    <form>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={searchValue}
          onChange={searchHandler}
          placeholder="Search…"
        />
      </Search>
    </form>
  );
}
