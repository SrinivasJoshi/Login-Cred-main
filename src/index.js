import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ToastProvider } from "react-toast-notifications";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<ToastProvider placement="bottom-left">
		<App />
	</ToastProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
