import React from "react";
import { Box, NavLink, Input } from 'theme-ui'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeColumns } from './redux'

function SidebarContent(props) {
  return (
    <Box
      sx={{
        minWidth: "200px",
        height: "100vh",
        bg: "backgroundLight",
        padding: 2
      }}
    >
      <Input 
        defaultValue={4}
        type="number"
        onChange={e => changeColumns(parseInt(e.target.value))}   
      />

      {props.categories.map(category => {
        return (<Box p={2}>
          <NavLink variant="nav">
            <Link to={`/${category}`}>{category}</Link>
          </NavLink>
        </Box>)
      })}
    </Box>
  );
}

function mapStateToProps(store) {
  return {
    categories: Object.keys(store.categoriesState.categories)
  }
}


export default connect(mapStateToProps)(SidebarContent)