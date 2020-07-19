import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box, Button, Text, AspectRatio, Heading, Divider } from "theme-ui";
import { clickButton } from './redux'

function Panel(props) {
  let { category } = useParams();
  let buttons = props.categories[category];

  if (buttons) {
    return (
      <Box>
        <Heading as="h1">{category}</Heading>
        <Divider />
        <Grid columns={props.columns} gap={2}>
          {buttons.map((button, i) => {
            return (
              <Box key={`${i}`}>
                <AspectRatio ratio={1}>
                  <Button
                    variant="panel"
                    sx={{
                      backgroundColor: button.color,
                      height: "100%",
                      width: "100%",
                      borderRadius: '20px',
                      "&:hover": {
                        filter: "brightness(150%)",
                      },
                    }}

                    onClick={() => clickButton(category, i)}
                  >
                    <Heading>{button.title}</Heading>
                  </Button>
                </AspectRatio>
              </Box>
            );
          })}
        </Grid>
      </Box>
    );
  } else {
    return <Text>No Buttons</Text>;
  }
}

function mapStateToProps(store) {
  return {
    categories: store.categoriesState.categories,
    columns: store.appState.columns,
  };
}

export default connect(mapStateToProps)(Panel);
