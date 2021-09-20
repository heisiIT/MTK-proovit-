import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import React, {useEffect, useState} from "react";
import "./App.css";
import IssuesInputForm from "./components/IssuesInputForm";
import IssuesList from "./components/IssuesList";
import fetchissues, {checkServerHealth, createissue, deleteissue, updateissue} from "./service/api";

const LOCAL_STORAGE_KEY = "issues-storage";
const LOCAL_STORAGE_C_KEY = "issues-to-create-storage";
const LOCAL_STORAGE_U_KEY = "issues-to-update-storage";
const LOCAL_STORAGE_D_KEY = "issues-to-delete-storage";
const ServerStat = {
    UP: {
        color: "primary"
    },
    DOWN: {
        color: "error"
    }
};

function App() {
    const [issues, setIssues] = useState([]);
    const [cissues, setCIssues] = useState([]);
    const [uissues, setUIssues] = useState([]);
    const [dissues, setDIssues] = useState([]);
    const [color, setColor] = useState("disabled");

    useEffect(() => {
        fetchissues()
            .then(result => {
                setIssues(result);
            });

    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(issues));
    }, [issues]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_C_KEY, JSON.stringify(cissues));
    }, [cissues]);
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_U_KEY, JSON.stringify(uissues));
    }, [uissues]);
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_D_KEY, JSON.stringify(dissues));
    }, [dissues]);


    useEffect(() => {
        const interval = setInterval(() => {
            syncServerData();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    function syncServerData() {
        checkServerHealth().then(stat => {
            setColor(ServerStat["UP"].color);
            let toDelete = JSON.parse(localStorage.getItem(LOCAL_STORAGE_D_KEY));
            for (const itemId in toDelete) {
                deleteissue(toDelete[itemId]).then(id => {
                    if (id !== null) {
                        setDIssues(dissues.filter(dissue => dissue.id !== id));
                    }
                });
            }
            let toCreate = JSON.parse(localStorage.getItem(LOCAL_STORAGE_C_KEY));
            for (const item in toCreate) {
                createissue(toCreate[item]).then(id => {
                    if (id !== null) {
                        setCIssues(cissues.filter(cissue => cissue.id !== id));
                    }
                });
            }

            let toUpdete = JSON.parse(localStorage.getItem(LOCAL_STORAGE_U_KEY));
            for (const item in toUpdete) {
                updateissue(toUpdete[item]).then(id => {
                    if (id !== null) {
                        setUIssues(uissues.filter(uissue => uissue.id !== id));
                    }
                });
            }


        }).catch(() => {
            setColor(ServerStat["DOWN"].color);
        }).finally(() => {
            fetchissues()
                .then(result => {
                    if (result && result.length !== 0) {
                        setIssues(result);
                    }
                });
        });
    }

    function addIssue(issue) {
        setIssues([issue, ...issues]);
        setCIssues([issue, ...cissues]);
    }

    function toggleComplete(id) {
        if (issues) {
            setIssues(
                issues.map(issue => {
                    if (issue.id === id) {
                        setUIssues([issue, ...uissues]);

                        return {
                            ...issue,
                            completed: !issue.completed
                        };
                    }
                    return issue;
                })
            );
        }
    }

    function removeIssue(id) {
        setIssues(issues.filter(issue => issue.id !== id));
        setDIssues([id, ...dissues]);
    }

    return (
        <div className="App">
            <div className="ui card">
                <div className="content">
                    <h3>
                        Server Status Monitor <HomeIcon color={color}/>
                    </h3>
                </div>
            </div>
            <Typography style={{padding: 14}} variant="h2">
                Demo: Kõnede register
            </Typography>
            <IssuesInputForm addIssue={addIssue}/>
            <IssuesList
                issues={issues}
                removeIssue={removeIssue}
                toggleComplete={toggleComplete}
            />
        </div>
    );
}

export default App;
