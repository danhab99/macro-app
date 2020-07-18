import React from 'react'
import {
  useParams
} from "react-router-dom"
import { connect } from 'react-redux'
import { Grid, Box, Button, Text, AspectRatio, Heading } from 'theme-ui'

function Panel(props) {
  let { category } = useParams()
  let buttons = props.categories[category]

  if (buttons) {
    return (
      <Grid columns={4} gap={4}>
        {buttons.map(button => {
          return (<Box>
            <AspectRatio ratio={1}>
              <Button variant="panel" sx={{
                backgroundColor: button.color,
                height: '100%',
                width: '100%',
                '&:hover': {
                  boxShadow: 'inset 0 0 100px 100px rgba(255, 255, 255, 0.5)'
                }
              }}>
                <Heading>{button.title}</Heading>
              </Button>
            </AspectRatio>
          </Box>)
        })}
      </Grid>
    )
  }
  else {
    return (<Text>No Buttons</Text>)
  }
}

function mapStateToProps(store) {
  return {
    categories: store.categoriesState.categories
  }
}

export default connect(mapStateToProps)(Panel)