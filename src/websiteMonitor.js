import React, { useState, useEffect } from "react";

function App() {
    const [websiteInput, setWebsiteInput] = useState("");
    const [websiteList, setWebsiteList] = useState([]);

    const addWebsite = () => {
        setWebsiteList((prevList) => [
            ...prevList,
            { url: websiteInput, status: "Checking..." },
        ]);
        setWebsiteInput("");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setWebsiteList((prevList) => {
                const updatedList = prevList.map((website) => {
                    const url = website.url;
                    fetch(url)
                        .then((response) => {
                            console.log(response)
                            if (response.ok) {
                                website.status = "Success";
                            } else {
                                website.status = "Failure";
                            }
                        })
                        .catch(() => {
                            website.status = "Failure";
                        });
                    return website;
                });
                return updatedList;
            });
        }, 120000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="website-monitor-container">
            <input
                placeholder="Enter website here to be monitored"
                type="text"
                className="input"
                value={websiteInput}
                onChange={(e) => setWebsiteInput(e.target.value)}
            />
            <button onClick={addWebsite}>Add</button>
            {
                websiteList.length > 0 && (
                    <table style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>Website</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {websiteList.map((website, index) => (
                                <tr key={index}>
                                    <td>{website.url}</td>
                                    <td><button className={website.status === "Success" ? 'success' : 'error'}>{website.status}</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }

        </div >
    );
}

export default App;
