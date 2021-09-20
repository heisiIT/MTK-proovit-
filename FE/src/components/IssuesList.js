import {List} from "@material-ui/core";
import React from "react";
import GetExternalIssues from "./GetExternalIssues";

function IssuesList({issues, toggleComplete, removeIssue}) {
    return (
        <List>
            {issues.map(issue => (
                <GetExternalIssues
                    key={issue.id}
                    issue={issue}
                    removeIssue={removeIssue}
                    toggleComplete={toggleComplete}
                />
            ))}
        </List>
    );
}

export default IssuesList;
