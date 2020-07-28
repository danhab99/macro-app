# macro-app

A user friendly remote macro keyboard on your mobile device for your computer. I personally designed this to work with my Galaxy Tab S4 but there's no reason why you can't use this on your phone.

![Screenshot](screenshots/Screenshot%20from%202020-07-28%2018-07-34.png)

## Installation

1. Clone `https://github/danhab99/macro-app.git` to your machine
2. Change directory to `app`
3. Run `npm install`
4. Run `npm run build`
5. Change directory to `server`
6. Run `npm install`
7. Run `npm link` to add `macro-server` as a command

## Usage

```bash
macro-server -h
Usage: macro-server [options]

Options:
  -p --port <port>      Port to listen on (default: 8080)
  -c --config <config>  File to button config
  -h, --help            display help for command
```

Open `localhost:8080` in your browser to see the macro buttons

There's no built in security, therefore I reccomend that when you use this on your mobile device you should establish an [ssh tunnel](https://www.ssh.com/ssh/tunneling/example). This will bypass all the annoying tls and domain issues you'd need to beable to install the webapp as a PWA.

### Config file

The config file is a JSON object that follows this schema. Once the server is running it will auto update the webapp. Be aware that the app defaults to the `Main` category.

```json
{
  "[category]": [ // This category appears on the sidebar
    {
      "title": "Text to display on button",
      "color": "Any valid css color",
      "cmd": "The command to run on your machine"
    }
    .
    .
    .
  ]
}
```
