import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import UserList from "./UserList";
import NavBar from "../../shared/navBar/navBar";
import AddUser from "./AddUser";

export default function ManageUser() {
    const [activeView, setActiveView] = useState("view"); // default view to "view"

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    return (
        <>
            <NavBar/>
            <div className="d-flex">
                {/* Sidebar */}
                <div className="bg-light p-3" style={{ width: "200px" }}>
                    <p className="fw-bold">Actions</p>
                    <ul className="list-unstyled">
                        <li>
                            <Button variant="link" onClick={() => handleViewChange("add")}>
                                Add
                            </Button>
                        </li>
                        <li>
                            <Button variant="link" onClick={() => handleViewChange("view")}>
                                View Data
                            </Button>
                        </li>
                    </ul>
                </div>

                {/* Main content */}
                <div className="p-4 flex-grow-1">
                    {activeView === "add" && (
                    <AddUser/>
                    )}

                    {activeView === "view" && (
                        <UserList />
                    )}
                </div>
            </div>
        </>
    );
}