import {Button, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";

function IssuesInputForm({addIssue}) {
    const [issue, setIssue] = useState({
        id: "",
        title: "",
        completed: false
    });

    function handleTaskInputChange(e) {
        setIssue({...issue, title: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (issue.title.trim()) {
            var id = uuidv4();
            issue.id = id;
            addIssue({...issue, id: id});
            setIssue({...issue, title: ""});
        }
    }

    return (
        <form className="issues-form" onSubmit={handleSubmit}>
            <TextField
                label="Kirjeldus"
                type="text"
                name="title"
                value={issue.title}
                onChange={handleTaskInputChange}
            />
            <Button color={"primary"} className={"btn btn-primary"} type="submit">Lisa</Button>
        </form>
    );
}

export default IssuesInputForm;
