/// <reference types="@welldone-software/why-did-you-render" />
import "./wdyr";

import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { initializeIcons } from "@fluentui/react";

initializeIcons();

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
