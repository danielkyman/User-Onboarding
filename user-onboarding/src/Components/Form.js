import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";



const UserForm = ({ values, touched, errors, status }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("Status has changed", status)
        status && setUsers(users => [...users, status])
    }, [status]);

    return (
        <div>
            <Form className="form">
                <label htmlFor="username">
                    Username:
                    <Field
                        className="username"
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                    />
                    {touched.username && errors.username && (<p>{errors.username}</p>)}
                </label>
                <br />
                <label htmlFor="password">
                    Password:
                    <Field
                        className="password"
                        id="password"
                        type="text"
                        name="password"
                        placeholder="Password"
                    />
                    {touched.password && errors.password && (<p>{errors.password}</p>)}
                </label>
                <br />
                <label htmlFor="email">
                    Email:
                    <Field
                        className="email"
                        id="email"
                        type="text"
                        name="email"
                        placeholder="email"
                    />
                </label>
                <br />
                <label htmlFor="terms">
                    Terms of Service:
                    <Field
                        className="terms"
                        id="terms"
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                </label>
                <br />
                <label htmlFor="comments">
                    Comments:
                    <Field
                        className="comments"
                        id="comments"
                        as="textarea"
                        type="text"
                        name="comments"
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </Form>
            <pre>{JSON.stringify(values, null, 2)}</pre>

            {users.map(user => (
                <ul key={user.id}>
                    <li>Username: {user.username}</li>
                    <li>Password: {user.password}</li>
                    <li>Email: {user.email}</li>
                </ul>
            ))}




        </div>
    )
};

const FormikUserForm = withFormik({
    mapPropsToValues({ username, password, email, terms, comments }) {
        return {
            username: username || "",
            password: password || "",
            email: email || "",
            terms: terms || true,
            comments: comments || ""
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required()
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("Submitting", values);
        axios.post("https://reqres.in/api/users", values)
            .then(response => {
                console.log("Success", response)
                setStatus(response.data);
                resetForm();
            })

    }
})(UserForm);


export default FormikUserForm;