import React from 'react';
import Sidebar from "react-sidebar"

import { ThemeProvider } from 'theme-ui'
import { Provider as ReduxProvider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'

import theme from './theme/theme'
import store from './redux'

import SidebarContent from './sidebar'

const mql = window.matchMedia(`(min-width: 800px)`)

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
        <ReduxProvider store={store}>
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
            </Sidebar>
          </ThemeProvider>
        </ReduxProvider>
      </Router>
    );
  }
}

export default App;

/*  */