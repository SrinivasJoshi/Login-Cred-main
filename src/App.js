import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import app from "./firebase";
import User from "./User";
import Login from "./Login";
import "./App.css";

function App() {
	const { addToast } = useToasts();
	const [user, setUser] = useState("");
	const [email1, setEmail1] = useState("");
	const [email2, setEmail2] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	const [email1Error, setEmail1Error] = useState("");
	const [password1Error, setPassword1Error] = useState("");
	const [email2Error, setEmail2Error] = useState("");
	const [password2Error, setPassword2Error] = useState("");

	const [toggle, setToggle] = useState(false);
	const [newPassword, setNewPassword] = useState("");

	const clearInputs = () => {
		setEmail1("");
		setPassword2("");
	};
	const clearInputs2 = () => {
		setEmail2("");
		setPassword2("");
	};

	const clearErrors = () => {
		setEmail1Error("");
		setPassword1Error("");
	};
	const clearErrors2 = () => {
		setEmail2Error("");
		setPassword2Error("");
	};

	const handleLogin = () => {
		clearErrors();

		app.auth()
			.signInWithEmailAndPassword(email1, password1)
			.catch((err) => {
				switch (err.code) {
					case "auth/invalid-email":
					case "auth/user-disabled":
					case "auth/user-not-found":
						setEmail1Error(err.message);
						break;
					case "auth/wrong-password":
						setPassword1Error(err.message);
						break;
				}
			});
	};
	const handleLoginClg = () => {
		clearErrors2();
		app.auth()
			.signInWithEmailAndPassword(email2, password2)
			.catch((err) => {
				switch (err.code) {
					case "auth/invalid-email":
					case "auth/user-disabled":
					case "auth/user-not-found":
						setEmail2Error(err.message);
						break;
					case "auth/wrong-password":
						setPassword2Error(err.message);
						break;
				}
			});
	};

	const handleLogout = () => {
		app.auth().signOut();
	};

	const authListener = () => {
		app.auth().onAuthStateChanged((user) => {
			if (user) {
				clearInputs();
				setUser(user);
			} else {
				setUser("");
			}
		});
	};
	const authListener2 = () => {
		app.auth().onAuthStateChanged((user) => {
			if (user) {
				clearInputs2();
				setUser(user);
			} else {
				setUser("");
			}
		});
	};

	useEffect(() => {
		authListener();
		authListener2();
	}, []);

	const toggleDiv = () => {
		setToggle(!toggle);
	};
	const resetPass = () => {
		let temp = newPassword;
		console.log(temp);
		toggleDiv();
		var user = app.auth().currentUser;
		user.updatePassword(newPassword)
			.then(function () {
				addToast("password update successfully", {
					appearance: "success",
				});
			})
			.catch(function (error) {
				addToast(error.message, { appearance: "error" });
			});
	};

	return (
		<div className="App">
			{user ? (
				<User
					handleLogout={handleLogout}
					toggleDiv={toggleDiv}
					toggle={toggle}
					setNewPassword={setNewPassword}
					resetPass={resetPass}
				/>
			) : (
				<Login
					email1={email1}
					email2={email2}
					password1={password1}
					password2={password2}
					setEmail1={setEmail1}
					setEmail2={setEmail2}
					setPassword1={setPassword1}
					setPassword2={setPassword2}
					handleLogin={handleLogin}
					handleLoginClg={handleLoginClg}
					email1Error={email1Error}
					email2Error={email2Error}
					password1Error={password1Error}
					password2Error={password2Error}
				/>
			)}
		</div>
	);
}

export default App;
