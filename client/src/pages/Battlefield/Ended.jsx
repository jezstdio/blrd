import React, { useEffect } from "react";
import { useState } from "react";

import { dateCounter } from "../../date";
import Navigation from "../../design-system/modules/Navigation";
import Head from "../../design-system/modules/Head";
import Footer from "../../design-system/modules/Footer";

export default function Ended(props) {
    const [winnerTeam, setWinnerTeam] = useState();
    const [defeatedTeam, setDefeatedTeam] = useState();

    function handleWinnerTeam() {
        const red = props.currentVote.teams.red;
        const blue = props.currentVote.teams.blue;

        if (red.scores[red.scores.length - 1] < blue.scores[blue.scores.length - 1]) { setWinnerTeam(blue); setDefeatedTeam(red); }
        if (red.scores[red.scores.length - 1] > blue.scores[blue.scores.length - 1]) { setWinnerTeam(red); setDefeatedTeam(blue); }
    }

    useEffect(handleWinnerTeam, [props.currentVote]);

    return (
        <React.Fragment>
            <Head
                color={winnerTeam ? winnerTeam.color : "#000000"}
                title={`${props.currentVote.teams.red.name} vs ${props.currentVote.teams.blue.name}`}
                description="Your Online Real-time Social Voting Game."
                url={`https://blrd.jezstd.io/${props.currentVote._id}`}
            />
            <div className="ended min_height-100vh"
                style={{
                    backgroundColor: winnerTeam ? winnerTeam.color : "#000000"
                }}
            >
                <Navigation
                    color={[winnerTeam ? winnerTeam.color : "#000000", defeatedTeam ? defeatedTeam.color : "#000000"]}
                    timer={dateCounter(props.currentVote.times.end[props.currentVote.times.end.length - 1])}
                />
                <div className="height-100 padding-t-64">
                    <div className="voteSide padding-t-88 color-white text-center width-100 height-100">
                        <h1 className="block font_size-96 flex center margin-b-8">
                            <span>
                                { winnerTeam ? winnerTeam.name.toUpperCase() : "NOBODY" }
                                <br />
                                { winnerTeam ? "WON" : "WON?" }
                            </span>
                            <span className="font_size-88 absolute">
                                { winnerTeam ? "🎉" : "🤔" }
                            </span>
                        </h1>
                        <section className="margin-b-32">
                            <span className="block font_size-40 margin-b-8">
                                { winnerTeam ? `${winnerTeam.scores[winnerTeam.scores.length - 1]} VOTES. WOW.` : "WAIT, WHAT?!" }
                            </span>
                            <small className="block margin-b-16">
                                { winnerTeam
                                    ? `and ${defeatedTeam.scores[defeatedTeam.scores.length - 1]} for ${defeatedTeam.name}. Better Luck next time!`
                                    :  `It's a draw between ${props.currentVote.teams.red.name} and ${props.currentVote.teams.blue.name}.`}
                            </small>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}