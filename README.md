# AutoCompleteInput

The Component offers completions based on User input.

## Demo

https://autocomplete-input.vercel.app/

For the best UX, it's recommended to open in Chrome (Firefox is not supporting the backdrop-filter yet).

Please note, that the API that serves the Demo returns random data upon each request, that may result in different completions for the same input (or consider it as a very frequently changing dynamic datasource :P)

## Overview

### Features

- Fetching & filtering is `asynchronous`, loading indicator is shown during, so User can notice that something is happening, the input remains responsive
- Fetching & filtering happens with `debounce` in order to reduce the number of requests (network traffic / server load) and the relatively expensive computation
- Filtering the data based on User input is `case-insensitive` and `accent-insensitive`, any occurence within is considered to be a match
- The completion dropdown doesn't affect the `surrounding layout`
- If there is only one completion based on the User input, hitting `Enter` will automatically apply it (no need to select it by keyboard/mouse)
- Applying a completion by `Enter` will not submit the form (if its embedded into one)
- Basic autocompletion performed by the browser is switched off (as well as the annoying spellcheck)
- Assuming that `dataKey` is not neccessarily unique on the data coming from `dataSource`, therefore the duplications are prefiltered (showing multiple equal completions makes no sense, based on API specification, its another task to handle the consequences)
- `Errors` are handled & logged to the console (e.g. data cannot be fetched/filtered because network, or parsing error happens, or the format is semantically incorrect), in such case simply no completions will be available
- The component design is `responsive`, colors can be easily adjusted by predefined CSS variables, icons are easily replaceable/disposable
- Pure ReactJS, no 3rd party libraries involved.

### Component Props

| Property      | Description                                                                                                                                                      | Required | Default               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------- |
| `dataSource`  | From where the autocompletion should be feeded, either an `URL` (REST endpoint of which expected response is JSON Array) or an `Object`                          | yes      | -                     |
| `dataKey`     | The key of the items in the data array the `searchTerm` compared against (type of the value beyond expected to be string, nothing else is reasonable to support) | yes      | -                     |
| `debounceMs`  | The time to be passed without User activity to fetch and filter the data                                                                                         | no       | 250                   |
| `placeHolder` | The placeholder of the input                                                                                                                                     | no       | Search by `<dataKey>` |

### User Interactions

###### Keyboard

| Interaction         | Effect                                                                                                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Regular             | The input changes, the list of completions updated, the `matching part` is highlighted on each                                                                               |
| ArrowUp / ArrowDown | The `selection` changes, the selected completion is highlighted. The list is `permeable` on both ends. If the list is `scrollable`, current selection always remains visible |
| Enter               | The selected completion is applied, the list of completions is hidden until further `Regular` keystroke happens                                                              |

###### Mouse

| Interaction | Effect                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| Hover       | The hovered completion is highlighted                                                                        |
| Click       | The clicked completion is applied, the list of completions is hidden until further Regular keystroke happens |

###### Generic

| Interaction | Effect                                                        |
| ----------- | ------------------------------------------------------------- |
| FocusOut    | The input looses focus, the list of completions is hidden     |
| FocusIn     | The input gains focus, the list of completions is shown again |

Focus change can happen either by mouse and keyboard interaction (or even by programmatic one, but thats not nice)

### Operation Manual

Nothing extraordinary, simply run `npm install` and then

- `npm start` for development mode
- `npm run build` for production build
