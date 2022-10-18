import React, { useEffect, useState, useRef } from "react";
import Helmet from "react-helmet";
import { dateCounter } from "../../date";
import { shadeColor, formatScore, randomNumber } from "../../utils";

import Navigation, { Backdrop } from "../../design-system/modules/Navigation";
import Head from "../../design-system/modules/Head";
import { webSocket } from "../../client_config";

function handleInput(e) {
    if (e.clientX !== undefined) { return [e.clientX, e.clientY] }
    if (e.touches !== undefined) { return [Array.from(e.touches)[e.touches.length - 1].clientX, Array.from(e.touches)[e.touches.length - 1].clientY] }
}

function PlusOneEffect(props) {
    const effect = React.createRef();
    const positionSwing = 32;

    return (
        <span
            ref={effect}
            className="plusone animation-plusone"
            style={{
                left: handleInput(props.e)[0] - positionSwing + randomNumber(-positionSwing, positionSwing),
                top: handleInput(props.e)[1] - positionSwing * 2
            }}
            
        >+1</span>
    )
}

function RippleEffect(props) {
    const effect = React.createRef();
    const size = 512;

    return (
        <div
            ref={effect}
            className="ripple animation-ripple bg_color-white-24"
            style={{
                height: size,
                width: size,
                left: handleInput(props.e)[0] - (size / 2),
                top: handleInput(props.e)[1] - (size / 2)
            }}
        ></div>
    )
}

function TeamChoose(props) {
    return (
        <React.Fragment>
            <section className="flex column center width-100 height-100 absolute top-0 left-0 text-center bg_blur-4 color-white zindex-5">
                <span className="">Welcome to BLRD!</span>
                <span className="font_size-48 margin-b-32">Choose your side!<br />Vote for Victory!</span>
                <div className="flex center column row--d width-100 padding-x-24">
                    <button
                        type="button"
                        className={`block font_size-32 width-100 margin-b-16--m margin-r-24--d maw-340px--d`.trim()}
                        style={{ background: props.vote.teams.red.color }}
                        onClick={e => {
                            props.setChoosenTeam("red");
                            props.setShowTeamChoose(false);
                        }}
                    >
                        { props.vote.teams.red.name }
                    </button>
                    <button
                        type="button"
                        className={`block font_size-32 width-100 margin-b-16--m margin-r-24--d maw-340px--d`.trim()}
                        style={{ background: props.vote.teams.blue.color }}
                        onClick={e => {
                            props.setChoosenTeam("blue");
                            props.setShowTeamChoose(false);
                        }}
                    >
                        { props.vote.teams.blue.name }
                    </button>
                </div>
            </section>
            <div className="zindex-2 relative">
                <Backdrop color={[props.vote.teams.blue.color, props.vote.teams.red.color]} showBackdrop />
            </div>
        </React.Fragment>
    )
}

export default function Open(props) {
    const effectContainer = React.createRef();

    const [plusOneEffectList, setPlusOneEffectList] = useState([]);
    const [rippleEffectList, setRippleEffectList] = useState([]);
    const [bottomTeamSize, setBottomTeamSize] = useState(window.innerHeight / 2);
    const [choosenTeam, setChoosenTeam] = useState("blue");
    const [showTeamChoose, setShowTeamChoose] = useState(true);
    const [showShare, setShowShare] = useState(false);
    const [timer, setTimer] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const ws = useRef();

    const handleTeams = () => {
        switch (choosenTeam) {
            case "red": return ["blue", "red"];
            case "blue": return ["red", "blue"];
            default: return ["red", "blue"];
        }
    };

    function calculateSize() {
        const topScore = props.currentVote.teams[handleTeams()[1]].scores[props.currentVote.teams[handleTeams()[1]].scores.length - 1];
        const bottomScore = props.currentVote.teams[handleTeams()[0]].scores[props.currentVote.teams[handleTeams()[0]].scores.length - 1];
    
        const headerHeight = 96;
        const tapHeight = 96;
    
        const deadZone = headerHeight + tapHeight;
        const voteZone = window.innerHeight - (2 * deadZone);
        const onePercent = voteZone / (topScore + bottomScore);
        const voteHeight = (onePercent * topScore) + deadZone;
    
        setBottomTeamSize(voteHeight);
    }

    function jello(e) {
        e.target.classList.remove("animation-jello");
        setTimeout(() => e.target.classList.add("animation-jello"), 10);
    }

    function removeEffect(setEffectList, time) {
        setTimeout(() => setEffectList(effect => {
            const temp = [...effect];

            if (temp.length > 0) {
                temp.shift();
            }

            return temp;
        }), time);
    }

    function createEffect(e, setEffectList, Component) {
        e.preventDefault();

        setEffectList(arr => arr.length > 0 ? [...arr, <Component key={Date.now()} e={e} />] : [<Component key={Date.now()} e={e} />])
        removeEffect(setEffectList, 500);
    }

    function handleBattleZone(e) {
        e.preventDefault();

        if (e.isTrusted) {
            calculateSize();
            createEffect(e, setPlusOneEffectList, PlusOneEffect);
            createEffect(e, setRippleEffectList, RippleEffect);
            voting(true);
        }
    }

    function handleTapButton(e) {
        e.preventDefault();

        jello(e);
        handleBattleZone(e);
    }

    function voting(trusted) {
        ws.current.send(JSON.stringify({
            type: "vote",
            trusted,
            vote: {
                id: props.vote,
                team: handleTeams()[1]
            }
        }));
    }

    useEffect(() => {
        ws.current = new webSocket({
            vote: props.vote,
            setVariable: props.setCurrentVote,
            ws,
            setIsLoading,
            voting: (trusted) => voting(trusted)
        });
    }, []);

    useEffect(() => { props.currentVote && calculateSize() }, [props.currentVote, choosenTeam]);
    useEffect(() => { props.currentVote && (window.onresize = calculateSize) }, [props.currentVote, choosenTeam]);
    useEffect(() => { timer === "Ended" && props.setIsOpen(false) }, [timer])

    useEffect(() => {
        document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

        return () => document.removeEventListener('touchmove', e => e.preventDefault(), { passive: false });
    }, []);

    useEffect(() => {
        let interval = null;

        props.currentVote && setTimer(dateCounter(props.currentVote.times.end[props.currentVote.times.end.length - 1]));
        
        if (props.currentVote && dateCounter(props.currentVote.times.end[props.currentVote.times.end.length - 1]) !== "Ended") {
            interval = setInterval(() => {
                setTimer(dateCounter(props.currentVote.times.end[props.currentVote.times.end.length - 1]));

                if (dateCounter(props.currentVote.times.end[props.currentVote.times.end.length - 1]) === "Ended") {
                    clearInterval(interval);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [props.currentVote]);

    return (
        <React.Fragment>
            <Head
                color={props.currentVote.teams[handleTeams()[0]].color}
                title={`${props.currentVote.teams.red.name} vs ${props.currentVote.teams.blue.name}`}
                description="Your Online Real-time Social Voting Game."
                url={`https://blrd.jezstd.io/${props.vote}`} />
            <div
                className="fixed top-0 right-0 bottom-0 left-0 overflow-hidden"
                style={{
                    backgroundColor: props.currentVote
                        ? props.currentVote.teams[handleTeams()[0]].color
                        : ''
                }}>
                <Navigation
                    color={[props.currentVote.teams[handleTeams()[0]].color, props.currentVote.teams[handleTeams()[1]].color]}
                    timer={!isLoading && timer} />
                <section
                    className={`${isLoading ? "animation-card_loading2" : ''} voteSide flex end-center absolute bottom-0 width-100 ${!props.currentVote.teams[handleTeams()[1]].color ? `bg_color-${handleTeams()[1]}--light` : ''}`.trim()}
                    style={{
                        backgroundColor: props.currentVote.teams[handleTeams()[1]].color
                            ? props.currentVote.teams[handleTeams()[1]].color
                            : '',
                        height: bottomTeamSize + "px" }}>
                    <div className="desktop-width flex row center-between width-100 absolute top-0 padding-x-16">
                        <div className="desktop-width margin-x-auto width-100 top-0 relative">
                            <div className="absolute bottom-0 left-0 width-100">
                                <span className="font_size-88 block lineHeight-104 color-gray-32--dark absolute left-0 bottom-0">{props.currentVote.teams[handleTeams()[0]].name}</span>
                                { !isLoading && <span className="font_size-32 absolute block width-100 color-white left-0 bottom-8 whitespace-nowrap">{formatScore(props.currentVote.teams[handleTeams()[0]].scores[props.currentVote.teams[handleTeams()[0]].scores.length - 1])}</span> }
                            </div>
                            <div className="absolute top-0 left-0 width-100">
                                <span className="font_size-88 block lineHeight-104 color-gray-32--dark absolute left-0 top-0">{props.currentVote.teams[handleTeams()[1]].name}</span>
                                { !isLoading && <span className="font_size-32 absolute block width-100 color-white left-0 top-8 whitespace-nowrap">{formatScore(props.currentVote.teams[handleTeams()[1]].scores[props.currentVote.teams[handleTeams()[1]].scores.length - 1])}</span> }
                            </div>
                            { !isLoading && <button type="button"
                                className={`absolute top-n24 right-0 zindex-2 round size-48 ${!props.currentVote.teams[handleTeams()[0]].color
                                    ? `bg_color-${handleTeams()[0]}--light`
                                    : ''}`.trim()}
                                style={{
                                    background: `linear-gradient(180deg, ${props.currentVote.teams[handleTeams()[0]].color
                                        ? props.currentVote.teams[handleTeams()[0]].color
                                        : ''} 0%, ${props.currentVote.teams[handleTeams()[0]].color
                                            ? shadeColor(props.currentVote.teams[handleTeams()[0]].color, -24)
                                            : ''} 100%)`
                                }}
                                onClick={e => {
                                    e.currentTarget.firstElementChild.classList.toggle("rotate-0");
                                    e.currentTarget.firstElementChild.classList.toggle("rotate-180");
                                    setChoosenTeam(choosenTeam === "red" ? "blue" : "red");
                                    calculateSize(); }}>
                                <i className="icon-change rotate-0"></i>
                            </button> }
                        </div>
                    </div>
                    { !isLoading && <React.Fragment>
                        <section
                            className="flex row center-between desktop-width padding-x-16--m relative bottom-24 width-100">
                            <button
                                type="button"
                                className={`font_size-32 zindex-2 line_height-40 relative bottom-0 block width-100 maw-340px--d animation-levitate ${!props.currentVote.teams[handleTeams()[1]].color ? `bg_color-${handleTeams()[1]}--light` : ''}`}
                                style={{
                                    background: `linear-gradient(180deg, ${props.currentVote.teams[handleTeams()[1]].color
                                        ? props.currentVote.teams[handleTeams()[1]].color
                                        : ''} 0%, ${props.currentVote.teams[handleTeams()[1]].color
                                            ? shadeColor(props.currentVote.teams[handleTeams()[1]].color, -24)
                                            : ''} 100%)`
                                }}
                                onTouchStart={handleTapButton}
                                onTouchEnd={e => e.preventDefault()}
                                onMouseDown={handleTapButton}>Tap to Vote</button>
                            <button type="button"
                                className={`none block--pwa relative right-16 zindex-5 margin-l-40 round size-48 ${!props.currentVote.teams[handleTeams()[1]].color
                                    ? `bg_color-${handleTeams()[1]}--light`
                                    : ''}`}
                                style={{
                                    background: `linear-gradient(180deg, ${props.currentVote.teams[handleTeams()[1]].color
                                        ? props.currentVote.teams[handleTeams()[1]].color
                                        : ''} 0%, ${props.currentVote.teams[handleTeams()[1]].color
                                            ? shadeColor(props.currentVote.teams[handleTeams()[1]].color, -24)
                                            : ''} 100%)`
                                }}
                                onClick={e => {
                                    e.preventDefault();
                                    setShowShare(!showShare);
                                }}> <i className={`icon-${showShare ? 'close' : 'share'}`}></i> </button>
                        </section>
                        <div
                            className="width-100 height-100 absolute bottom-0 zindex-1"
                            onTouchStart={handleBattleZone}
                            onTouchEnd={e => e.preventDefault()}
                            onMouseDown={handleBattleZone}></div>
                        <div ref={effectContainer} className="overflow-hidden width-100 height-100 absolute bottom-0">
                            { plusOneEffectList.length > 0 && plusOneEffectList.map(effect => effect) }
                            { rippleEffectList.length > 0 && rippleEffectList.map(effect => effect) }
                        </div>
                    </React.Fragment> }
                </section>
                { showTeamChoose && <TeamChoose
                    vote={props.currentVote}
                    setChoosenTeam={setChoosenTeam}
                    setShowTeamChoose={setShowTeamChoose} />
                }
                { showShare && <Share
                    vote={props.currentVote}
                    handleTeams={handleTeams}
                     />
                }
            </div>
        </React.Fragment>
    )
}

function Share(props) {
    const [copied, setCopied] = useState(false);

    function copyShareLink(e) {
        e.preventDefault();
    
        navigator.clipboard.writeText(e.target.innerHTML).then(() => setCopied(true));
    }

    return (
        <React.Fragment>
            <section className="flex column center width-100 height-100 absolute top-0 left-0 zindex-4 bg_blur-4 color-white">
                <span>Share this Voting!</span>
                <h1 className="font_size-48 margin-b-32">{props.vote.teams.red.name} vs {props.vote.teams.blue.name}</h1>
                <div
                    className={`input--link margin-b-8 ${copied ? 'copied' : ''}`}
                    onClick={e => copyShareLink(e)}
                    >blrd.jezstd.io/{props.vote._id}</div>
                { !copied && <span>Tap to Copy</span> }
                { copied && <span className="color-green--light">Copied to your clipboard!</span> }
            </section>
            <div className="zindex-2 relative">
                <Backdrop color={[props.vote.teams[props.handleTeams()[1]].color, props.vote.teams[props.handleTeams()[0]].color]} showBackdrop />
            </div>
        </React.Fragment>
    )
}