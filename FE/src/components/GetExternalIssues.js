import {Checkbox, IconButton, ListItem, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

function GetExternalIssues({issue, toggleComplete, removeIssue}) {

    function handleCheckboxClick() {
        toggleComplete(issue.id);
    }

    function handleRemoveClick() {
        removeIssue(issue.id);
    }

    return (
        <ListItem style={{display: "flex"}}>
            <Checkbox checked={issue.completed} onClick={handleCheckboxClick}/>
            <Typography
                variant="body1"
                style={{textDecoration: issue.completed ? "line-through" : null}}>
                {issue.title}
            </Typography>
            <IconButton onClick={handleRemoveClick}>
                <CloseIcon/>
            </IconButton>
        </ListItem>
    );
}

export default GetExternalIssues;
