import React from 'react'
import {
  useParams
} from "react-router-dom"
import { connect } from 'react-redux'
import { Grid, Box, Button } from 'theme-ui'
import { render } from 'react-dom'

function Panel(props) {
  let { category } = useParams()
  let buttons = props.categories[category]

  render (
    <Grid>
      {buttons.map(button => {
        return (<Box>
          <Button sx={{
            backgroundColor: button.color
          }}>
            {button.title}
          </Button>
        </Box>)
      })}
    </Grid>
  )
}

function mapStateToProps(store) {
  return {
    categories: store.buttonsState
  }
}

export default connect(mapStateToProps)(Panel)