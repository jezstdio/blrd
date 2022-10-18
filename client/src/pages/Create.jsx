import React, { useState, useRef, useEffect } from "react";

import Head from "../design-system/modules/Head";
import Navigation from "../design-system/modules/Navigation";
import Footer from "../design-system/modules/Footer";

export default function Create() {
    const [blrdLetters, setBlrdLetters] = useState();
    const [dragStartIndex, setDragStartIndex] = useState();

    const [redTeam, setRedTeam] = useState({});
    const [blueTeam, setBlueTeam] = useState({});
    const [length, setLength] = useState("86400000");
    const [privacy, setPrivacy] = useState("public");
    const [categories, setCategories] = useState([]);
    const [repeatAfter, setRepeatAfter] = useState("-1");

    const moveLetter = useRef(false);

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
      }

    function randomCharacter() {
        const abc = "abcdefghijklmnopqrstuvwxyz0123456789";

        return abc[Math.floor(Math.random() * abc.length)]
    }

    function generate6Letters() {
        const letters = [];

        for (let i = 0; i < 6; i++) { letters.push(randomCharacter()) }

        return letters.join("");
    }

    function dragStart(e, index) {
        e.preventDefault();

        setDragStartIndex(index);
        moveLetter.current = true;
    }

    function dragMove(e) {
        if (moveLetter.current) {
            e.preventDefault();

            const x = e.currentTarget.offsetLeft;
            const clientX = e.type === "mousemove" ? e.clientX : e.changedTouches[0].clientX;
            const clientY = e.type === "mousemove" ? e.clientY : e.changedTouches[0].clientY;

            e.currentTarget.style.transform = `translate(${clientX - 20 - x}px, ${(clientY - clientY)}px)`;
        }
    }

    function dragDrop(e) {
        e.preventDefault();

        moveLetter.current = false;
        e.currentTarget.style.transform = null;

        const clientX = e.type === "mouseup" ? e.clientX : e.changedTouches[0].clientX;
        const clientY = e.type === "mouseup" ? e.clientY : e.changedTouches[0].clientY;
        const index = blrdLetters.findIndex(letter => letter[1] === document.elementFromPoint(clientX, clientY).closest("span").id);

        setBlrdLetters(seq => {
            const temp = [...seq];
            temp.splice(index, 0, temp.splice(dragStartIndex, 1)[0]);
            return temp;
        });
    }

    function handleCategory(category) {
        return categories.includes(category)
            ? categories.filter((cat, index) => index === categories.indexOf(category) ? false : cat)
            : [...categories, category];
    }

    useEffect(() => {
        setBlrdLetters(shuffleArray([
            ["b", generate6Letters(), <svg width="40" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M29.744 0c3.567 0 4.86.371 6.163 1.069a7.27 7.27 0 0 1 3.024 3.024C39.63 5.396 40 6.689 40 10.256v43.488c0 3.567-.371 4.86-1.069 6.163a7.27 7.27 0 0 1-3.024 3.024C34.604 63.63 33.311 64 29.744 64H10.256c-3.567 0-4.86-.371-6.163-1.069a7.27 7.27 0 0 1-3.024-3.024C.37 58.604 0 57.311 0 53.744V10.256c0-3.567.371-4.86 1.069-6.163a7.27 7.27 0 0 1 3.024-3.024C5.396.37 6.689 0 10.256 0h19.488ZM20.16 15h-7.08v32h7.12c2.56 0 4.4-.507 5.52-1.52 1.12-1.013 1.72-2.693 1.8-5.04.027-.8.047-1.533.06-2.2a26.774 26.774 0 0 0-.06-2.24c-.053-1.307-.333-2.347-.84-3.12-.468-.714-1.197-1.235-2.187-1.562l-.253-.078v-.8c1.067-.32 1.847-.86 2.34-1.62.493-.76.78-1.78.86-3.06.018-.427.03-.856.036-1.289l.004-.651v-2.26c0-2.347-.587-4.027-1.76-5.04-1.115-.963-2.843-1.468-5.185-1.516L20.16 15Zm.12 17.84c.96 0 1.64.253 2.04.76.4.507.613 1.373.64 2.6.027 1.387.027 2.787 0 4.2-.027.853-.253 1.487-.68 1.9-.427.413-1.12.62-2.08.62h-2.56V32.84h2.64Zm-.12-13.76c1.813 0 2.72.747 2.72 2.24.027.773.04 1.493.04 2.16s-.013 1.387-.04 2.16c0 2.08-.853 3.12-2.56 3.12h-2.68v-9.68h2.52Z" fill="#006CEF" fillRule="evenodd"/></svg>],
            ["l", generate6Letters(), <svg width="40" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M29.744 0c3.567 0 4.86.371 6.163 1.069a7.27 7.27 0 0 1 3.024 3.024C39.63 5.396 40 6.689 40 10.256v43.488c0 3.567-.371 4.86-1.069 6.163a7.27 7.27 0 0 1-3.024 3.024C34.604 63.63 33.311 64 29.744 64H10.256c-3.567 0-4.86-.371-6.163-1.069a7.27 7.27 0 0 1-3.024-3.024C.37 58.604 0 57.311 0 53.744V10.256c0-3.567.371-4.86 1.069-6.163a7.27 7.27 0 0 1 3.024-3.024C5.396.37 6.689 0 10.256 0h19.488ZM18.92 15h-4.56v32h12.2v-4.08h-7.64V15Z" fill="#006CEF" fillRule="evenodd"/></svg>],
            ["r", generate6Letters(), <svg width="40" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M29.744 0c3.567 0 4.86.371 6.163 1.069a7.27 7.27 0 0 1 3.024 3.024C39.63 5.396 40 6.689 40 10.256v43.488c0 3.567-.371 4.86-1.069 6.163a7.27 7.27 0 0 1-3.024 3.024C34.604 63.63 33.311 64 29.744 64H10.256c-3.567 0-4.86-.371-6.163-1.069a7.27 7.27 0 0 1-3.024-3.024C.37 58.604 0 57.311 0 53.744V10.256c0-3.567.371-4.86 1.069-6.163a7.27 7.27 0 0 1 3.024-3.024C5.396.37 6.689 0 10.256 0h19.488ZM20.12 15h-7.04v32h4.56V35.48H20L23 47h4.84l-3.48-12.28c.987-.453 1.713-1.147 2.18-2.08.467-.933.727-2.147.78-3.64.053-1.333.08-2.54.08-3.62s-.027-2.38-.08-3.9c-.08-2.293-.673-3.947-1.78-4.96-1.051-.963-2.734-1.468-5.05-1.516L20.12 15Zm0 4.08c.907 0 1.56.173 1.96.52.4.347.627.907.68 1.68.053 1.387.08 2.707.08 3.96 0 1.253-.027 2.587-.08 4-.053.747-.28 1.293-.68 1.64s-1.053.52-1.96.52h-2.48V19.08h2.48Z" fill="#F30C47" fillRule="evenodd"/></svg>],
            ["d", generate6Letters(), <svg width="40" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M29.744 0c3.567 0 4.86.371 6.163 1.069a7.27 7.27 0 0 1 3.024 3.024C39.63 5.396 40 6.689 40 10.256v43.488c0 3.567-.371 4.86-1.069 6.163a7.27 7.27 0 0 1-3.024 3.024C34.604 63.63 33.311 64 29.744 64H10.256c-3.567 0-4.86-.371-6.163-1.069a7.27 7.27 0 0 1-3.024-3.024C.37 58.604 0 57.311 0 53.744V10.256c0-3.567.371-4.86 1.069-6.163a7.27 7.27 0 0 1 3.024-3.024C5.396.37 6.689 0 10.256 0h19.488ZM19.92 15h-7.24v32h7.36c2.533 0 4.36-.527 5.48-1.58s1.693-2.793 1.72-5.22c.053-2.187.087-4.267.1-6.24a441.06 441.06 0 0 0 0-5.94 354.849 354.849 0 0 0-.1-6.26c-.027-2.4-.613-4.127-1.76-5.18-1.092-1.003-2.825-1.529-5.2-1.576L19.92 15Zm0 4.08c.96 0 1.653.18 2.08.54.427.36.653.913.68 1.66.053 2.32.093 4.52.12 6.6.027 2.08.027 4.16 0 6.24s-.067 4.28-.12 6.6c-.027.747-.247 1.3-.66 1.66-.413.36-1.073.54-1.98.54h-2.8V19.08h2.68Z" fill="#F30C47" fillRule="evenodd"/></svg>],
            ["!", generate6Letters(), <svg width="40" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M29.744 0c3.567 0 4.86.371 6.163 1.069a7.27 7.27 0 0 1 3.024 3.024C39.63 5.396 40 6.689 40 10.256v43.488c0 3.567-.371 4.86-1.069 6.163a7.27 7.27 0 0 1-3.024 3.024C34.604 63.63 33.311 64 29.744 64H10.256c-3.567 0-4.86-.371-6.163-1.069a7.27 7.27 0 0 1-3.024-3.024C.37 58.604 0 57.311 0 53.744V10.256c0-3.567.371-4.86 1.069-6.163a7.27 7.27 0 0 1 3.024-3.024C5.396.37 6.689 0 10.256 0h19.488ZM23.32 42.28h-6.64V47h6.64v-4.72Zm-1-27.28h-4.64v13.28l.64 11.16h3.4l.6-11.16V15Z" fill="#F30C47" fillRule="evenodd"/></svg>]
        ]))
    }, []);

    return (
        <React.Fragment>
            <Head
                title="Create Vote | BLRD! Your Online Real-time Social Voting Game."
                description="Your Online Real-time Social Voting Game."
                url={`https://blrd.jezstd.io/create`}
                />
            <div>
                <Navigation />
                <section className="padding-t-32 margin-b-24 margin-b-24--d margin-x-auto relative bg_color-red-blue-gradient">
                    <div className="max-width margin-x-auto margin-b-24 margin-b-40--d padding-x-24">
                        <span className="color-white relative font_size-48 capitalize">CREATE YOUR VOTE ❤️🤗💙</span>
                    </div>
                    <section className="max-width margin-x-auto padding-x-24 padding-b-24 padding-b-32--d relative">
                        <div className="flex column row--d width-100">
                            <label className="relative margin-b-24 width-100 margin-r-48--d">
                                <input type="text" placeholder="Red Team" value={redTeam.name} onChange={e => setRedTeam({
                                    ...redTeam,
                                    name: e.target.value
                                })} />
                                <div className="team-indicator--red absolute right-0 top-8"></div>
                            </label>
                            <label className="relative width-100">
                                <input type="text" placeholder="Blue Team" value={blueTeam.name} onChange={e => setBlueTeam({
                                    ...blueTeam,
                                    name: e.target.value
                                })} />
                                <div className="team-indicator--blue absolute right-0 top-8"></div>
                            </label>
                        </div>
                    </section>
                </section>
                <section className="max-width margin-x-auto padding-x-24">
                    <section className="margin-b-24">
                        <span className="block font_size-24 margin-b-16">Vote Length</span>
                        <div className="flex row">
                            <div className="margin-r-8 margin-b-8">
                                <input id="length-1day" type="radio" value="86400000" name="length"
                                    checked={length === "86400000"}
                                    onChange={e => setLength(e.target.value)}
                                />
                                <label htmlFor="length-1day">1 Day</label>
                            </div>
                            <div className="margin-r-8 margin-b-8">
                                <input id="length-1week" type="radio" value="604800000" name="length"
                                    checked={length === "604800000"}
                                    onChange={e => setLength(e.target.value)}
                                />
                                <label htmlFor="length-1week">1 Week</label>
                            </div>
                            <div>
                                <input id="length-1month" type="radio" value="18144000000" name="length"
                                    checked={length === "18144000000"}
                                    onChange={e => setLength(e.target.value)}
                                />
                                <label htmlFor="length-1month">1 Month</label>
                            </div>
                        </div>
                    </section>
                    <section className="margin-b-24">
                        <span className="block font_size-24 margin-b-16">Privacy</span>
                        <div className="flex row margin-b-16">
                            <div className="margin-r-8">
                                <input id="privacy-public" type="radio" value="public" name="privacy"
                                    checked={privacy === "public"}
                                    onChange={e => setPrivacy(e.target.value)}
                                />
                                <label htmlFor="privacy-public">Public</label>
                            </div>
                            <div className="margin-r-8">
                                <input id="privacy-private" type="radio" value="private" name="privacy"
                                    checked={privacy === "private"}
                                    onChange={e => setPrivacy(e.target.value)}
                                />
                                <label htmlFor="privacy-private">Private</label>
                            </div>
                        </div>
                        <span className="block color-note">Private votes will not appear on the home feed and search results.</span>
                    </section>
                    <section className="margin-b-24">
                        <span className="block font_size-24 color-red--light">Choose the Category</span>
                        <span className="block margin-b-16 color-red--light">This is required 👀</span>
                        <div className="flex row wrap">
                            <div className="margin-r-8 margin-b-8">
                                <input id="category-lifestyle" type="checkbox" value="lifestyle" name="category"
                                    checked={categories.includes("lifestyle")}
                                    onChange={e => setCategories(() => handleCategory("lifestyle"))}
                                />
                                <label htmlFor="category-lifestyle">Lifestyle</label>
                            </div>
                            <div className="margin-r-8 margin-b-8">
                                <input id="category-fashion%20&%20brands" type="checkbox" value="fashion%20&%20brands" name="category"
                                    checked={categories.includes("fashion%20&%20brands")}
                                    onChange={e => setCategories(() => handleCategory("fashion%20&%20brands"))}
                                />
                                <label htmlFor="category-fashion%20&%20brands">Fasion & Brands</label>
                            </div>
                            <div className="margin-r-8 margin-b-8">
                                <input id="category-food" type="checkbox" value="food" name="category"
                                    checked={categories.includes("food")}
                                    onChange={e => setCategories(() => handleCategory("food"))}
                                />
                                <label htmlFor="category-food">Food</label>
                            </div>
                            <div className="margin-r-8 margin-b-8">
                                <input id="category-tech" type="checkbox" value="tech" name="category"
                                    checked={categories.includes("tech")}
                                    onChange={e => setCategories(() => handleCategory("tech"))}
                                />
                                <label htmlFor="category-tech">Tech</label>
                            </div>
                            <div className="margin-r-8 margin-b-8">
                                <input id="category-animals" type="checkbox" value="animals" name="category"
                                    checked={categories.includes("animals")}
                                    onChange={e => setCategories(() => handleCategory("animals"))}
                                />
                                <label htmlFor="category-animals">Animals</label>
                            </div>
                            <div className="margin-r-8 margin-b-8">
                                <input id="category-culture" type="checkbox" value="culture" name="category"
                                    checked={categories.includes("culture")}
                                    onChange={e => setCategories(() => handleCategory("culture"))}
                                />
                                <label htmlFor="category-culture">Culture</label>
                            </div>
                            <div className="margin-r-8 margin-b-8">
                                <input id="category-gaming" type="checkbox" value="gaming" name="category"
                                    checked={categories.includes("gaming")}
                                    onChange={e => setCategories(() => handleCategory("gaming"))}
                                />
                                <label htmlFor="category-gaming">Gaming</label>
                            </div>
                        </div>
                    </section>
                    <section className="margin-b-24">
                        <span className="block font_size-24 margin-b-16">Repeat After</span>
                        <div className="flex row wrap">
                            <div className="margin-r-8 margin-b-8">
                                <input id="repeat-no_repeat" type="radio" value="-1" name="repeat"
                                    checked={repeatAfter === "-1"}
                                    onChange={e => setRepeatAfter(e.target.value)}
                                />
                                <label htmlFor="repeat-no_repeat">No Repeat</label>
                            </div>
                            <div className="margin-r-8 margin-b-8">
                                <input id="repeat-immediately" type="radio" value="0" name="repeat"
                                    checked={repeatAfter === "0"}
                                    onChange={e => setRepeatAfter(e.target.value)}
                                />
                                <label htmlFor="repeat-immediately">Immediately</label>
                            </div>
                            <div className="margin-r-8 margin-b-8">
                                <input id="repeat-1day" type="radio" value="86400000" name="repeat"
                                    checked={repeatAfter === "86400000"}
                                    onChange={e => setRepeatAfter(e.target.value)}
                                />
                                <label htmlFor="repeat-1day">1 Day</label>
                            </div>
                            <div className="margin-r-8 margin-b-8">
                                <input id="repeat-1week" type="radio" value="604800000" name="repeat"
                                    checked={repeatAfter === "604800000"}
                                    onChange={e => setRepeatAfter(e.target.value)}
                                />
                                <label htmlFor="repeat-1week">1 Week</label>
                            </div>
                            <div>
                                <input id="repeat-1month" type="radio" value="18144000000" name="repeat"
                                    checked={repeatAfter === "18144000000"}
                                    onChange={e => setRepeatAfter(e.target.value)}
                                />
                                <label htmlFor="repeat-1month">1 Month</label>
                            </div>
                        </div>
                    </section>
                    <section>
                        <span className="block font_size-24 margin-b-16">You are not a robot, are you? 🧐</span>
                        <div className="flex row margin-b-16">
                            { blrdLetters && blrdLetters.map((letter, index) => (
                                <span className="block margin-r-4" key={letter[0]} id={letter[1]}
                                    onMouseDown={e => dragStart(e, index)}
                                    onMouseMove={dragMove}
                                    onMouseUp={dragDrop}
                                    onTouchStart={e => dragStart(e, index)}
                                    onTouchMove={dragMove}
                                    onTouchEnd={dragDrop}
                                > {letter[2]} </span>
                            )) }
                        </div>
                        <span className="block color-note">Re-arrange the letters to the correct order to prove that you are human, also it's fun!</span>
                    </section>
                </section>
                <Footer />
            </div>
        </React.Fragment>
    )
}