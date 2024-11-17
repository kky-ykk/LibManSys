import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";
import NavBar from "../../shared/navBar/navBar";

export default function BookManagement() {
    const [activeView, setActiveView] = useState("view"); // default view to "view"
    
    const handleViewChange = (view) => {
        setActiveView(view);
    };

    return (
        <>  
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
                        <AddBook/>
                    )}

                    {activeView === "view" && (
                        <UpdateBook/>
                    )}
                </div>
            </div>
                </>
    );
}
