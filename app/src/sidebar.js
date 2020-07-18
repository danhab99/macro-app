import React from "react";
/** @jsx jsx */
import { jsx, Box, NavLink, Input } from 'theme-ui'
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
        min={1}
      />

      {props.categories.map(category => {
        return (<Box p={2}>
          <NavLink sx={{
            fontSize: 5,
            color: 'text !important'
          }}>
            <Link to={`/${category}`} sx={{variant: 'styles.a'}} >{category}</Link>
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