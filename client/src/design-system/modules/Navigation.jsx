import React, { useState } from "react";

import { Twitter } from "./Icon";

export default function Navigation(props) {
    const [showSubNav, setShowSubNav] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);

    const hamburger = React.createRef();

    function toggleSubnav(e) {
        e.preventDefault(e);
    
        hamburger.current.classList.toggle("clicked");
    
        setShowSubNav(!showSubNav);
        setShowBackdrop(!showBackdrop);
    
        document.body.classList.toggle("overflow-hidden");
    }

    return (
        <nav>
            <div className="navigation">
                <div className="flex row nowrap justify-between max-width width-100 margin-x-a padding-x-16">
                    <div className="flex center-start row">
                        <button className="hamburger zindex-8" onClick={toggleSubnav} ref={hamburger}>
                            <span className={`layer cheese ${props.color ? "bg_color-white" : "bg_color-blue--light"}`}></span>
                            <span className={`layer meat ${props.color ? "bg_color-white" : "bg_color-blue--light"}`}></span>
                            <span className={`layer salad ${props.color ? "bg_color-white" : "bg_color-blue--light"}`}></span>
                        </button>
                        <a className="font_size-32 no-decoration zindex-7" href="/">
                            <span className={props.color ? "color-white" : "color-blue--light"}>BL</span><span className={props.color ? "color-white" : "color-red--light"}>RD!</span>
                        </a>
                    </div>
                    <div className="flex end-center column zindex-6">
                        { /* props.create && <a href="/create" className="btn font_size-16 color-white padding-x-24 padding-y-8 bg_color-red-blue-gradient">Create Vote</a> */ }
                        { props.timer && <span className="font_size-24 color-gray-32--dark margin-r-16">{ props.timer }</span> }
                    </div>
                </div>
            </div>
            <Subnavigation color={props.color} showSubNav={showSubNav}/> 
            <Backdrop css="zindex-6" color={props.color} toggleSubnav={toggleSubnav} showBackdrop={showBackdrop}/>
        </nav>
    )
}

export function Subnavigation(props) {
    return (
        <div
            className={`subnavigation padding-l-56 left-0 left-a0--d zindex-7 ${props.showSubNav ? "opened" : "hidden"}`.trim()}
            style={{ backgroundColor: props.color && props.color[0] }}>
            <a className="block padding-t-16 margin-b-32 font_size-32 no-decoration" href="#">
                <span className={props.color ? "color-white" : "color-blue--light"}>ME</span><span className={props.color ? "color-white" : "color-red--light"}>NU</span>
            </a>
            <div className="margin-b-24">
                <NavigationElements color={props.color} />
            </div>
            <section className="flex row margin-b-32">
                <Twitter />
            </section>
        </div>
    )
}

export function NavigationElements(props) {
    return (
        <React.Fragment>
            <a className={`block no-decoration font_size-32 margin-b-8 ${props.color ? "color-white" : ''} ${props.activeLink === "home" ? "active" : ''}`} href="/">Home</a>
            <a className={`block no-decoration font_size-32 margin-b-8 ${props.color ? "color-white" : ''} ${props.activeLink === "about" ? "active" : ''}`} href="/about">About Us</a>
            <a className={`block no-decoration font_size-32 margin-b-8 ${props.color ? "color-white" : ''} ${props.activeLink === "blog" ? "active" : ''}`} href="/blog">Blog</a>
        </React.Fragment>
    )
}

export function Backdrop(props) {
    return (
        <div className={`backdrop-container ${props.showBackdrop ? "bg_blur-4" : "hidden opacity-0"} ${props.css ? props.css : ''} absolute top-0 left-0 width-100 height-100`}>
            <div
                className={`backdrop ${props.showBackdrop ? "opacity-88" : "hidden opacity-0"}`}
                style={{ background: `linear-gradient(180deg, ${props.color ? props.color[1] : "#F30C47"} 0%, ${props.color ? props.color[0] : "#006CEF"} 100%)` }}
                onClick={props.toggleSubnav}></div>
        </div>
    )
}