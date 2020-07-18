import React from "react";
import Sidebar from "react-sidebar";

import { ThemeProvider, Heading, MenuButton, Box } from "theme-ui";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import theme from "./theme/theme";
import { loadButtons, subToButtonClick } from './redux'

import SidebarContent from "./sidebar";
import Panel from './panel'

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: true,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    this._ws = new WebSocket('ws://localhost:8080')

    this._ws.onopen = () => {
      this.send('get config')

      subToButtonClick((act) => {
        this.send('click', {
          category: act.category,
          index: act.index
        })
      })
    }

    this._ws.onmessage = msg => {
      try {
        msg = JSON.parse(msg.data)
      }
      catch (e) {
        console.error(e)
      }

      switch (msg.topic) {
        case 'config':
          loadButtons(msg.data)
          break
      }
    }
  }

  send(topic, data) {
    this._ws.send(JSON.stringify({topic, data}))
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Sidebar
            sidebar={<SidebarContent />}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
          >
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Heading>
              <MenuButton
                sx={{
                  display: this.state.sidebarDocked ? "none" : "block",
                  position: "fixed",
                }}
                onClick={() => this.onSetSidebarOpen(true)}
              />
            </Heading>
              
            <Box p={4}>
              <Switch>
                <Route path="/:category" children={<Panel />} />
              </Switch>
            </Box>
            
          </Sidebar>
        </ThemeProvider>
      </Router>
    );
  }
}

function mapStateToProps(store) {
  return {
    categories: store.categoriesState,
  };
}

export default connect(mapStateToProps)(App);
