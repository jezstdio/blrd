import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../client_config";
import Open from "./Battlefield/Open";
import Ended from "./Battlefield/Ended";

export default function Battlefield() {
    const { vote } = useParams();

    const [currentVote, setCurrentVote] = useState();
    const [isOpen, setIsOpen] = useState(null);

    useEffect(() => {
        api.get("/vote", { params: { id: vote }})
            .then(res => {
                setCurrentVote(res.data.vote);
                setIsOpen(res.data.isOpen);
            })
            .catch((err) => console.log(err) );
    }, []);

    return (
        <React.Fragment>
            { currentVote && isOpen && <Open vote={vote} setIsOpen={setIsOpen} currentVote={currentVote} setCurrentVote={setCurrentVote} />}
            { currentVote && !isOpen && <Ended vote={vote} currentVote={currentVote} />}
        </React.Fragment>
    )
}