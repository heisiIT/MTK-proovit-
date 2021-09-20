const axios = require('axios');
const baseURL = "http://localhost:8080";

const fetchissues = async () => {

    const url = baseURL + '/issues';
    return await axios.get(url)
        .then(res => {
            const result = res.data;
            if (result && result.length !== 0) {
                return result.slice(0, 100);
            }
            return [];
        }).catch(error => {
            console.error(error);
            return []
        });
};

export const syncissues = async (uiIssues) => {

    const url = baseURL + '/issues';
    return await axios.put(url, uiIssues)
        .then(res => {
            const result = res.data;
            if (result && result.length !== 0) {
                return result.slice(0, 100);
            }
            return [];
        }).catch(error => {
            console.error(error);
            return []
        });
};

export const updateissue = async (uiIssue) => {

    const url = baseURL + '/issues';
    return await axios.put(url, uiIssue)
        .then(res => {
            if (res.status === 200) {
                return uiIssue.id;
            }
            return null;
        }).catch(error => {
            console.error(error);
            return null
        });
};

export const createissue = async (uiIssue) => {

    const url = baseURL + '/issues';
    return await axios.post(url, uiIssue)
        .then(res => {
            if (res.status === 200) {
                return uiIssue.id;
            }
            return null;
        }).catch(error => {
            console.error(error);
            return null
        });
};

export const deleteissue = async (itemId) => {

    const url = baseURL + '/issues/';
    return await axios.delete(url + itemId)
        .then(res => {
            if (res.status === 200) {
                return itemId;
            }
            return null;
        }).catch(error => {
            console.error(error);
            return null
        });
};

export const checkServerHealth = async () => {

    const url = baseURL + "/health";
    await axios.get(url)
        .then(res => {
                return res.statusText;
            }
        )
};

export default fetchissues;
