import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../client_config';

import Head from "../design-system/modules/Head";
import Card, { CardPlaceholder } from "../design-system/modules/Card";
import Category from "../design-system/modules/Category";
import Navigation from "../design-system/modules/Navigation";
import Footer from "../design-system/modules/Footer";
import { randomNumber } from '../utils';

export default function Home() {
    const { category } = useParams();

    const [isOpenVotesShown, setIsOpenVotesShown] = useState(true);
    const [popularVotes, setPopularVotes] = useState([]);
    const [openVotes, setOpenVotes] = useState([]);
    const [endedVotes, setEndedVotes] = useState([]);

    const [isLoading, setIsLoading] = useState({
      popular: false,
      open: false,
      ended: false
    });

    const cardSlider = React.createRef();
    const toggle = React.createRef();
  
    function horizontalScroll(element, direction, speed, distance, step) {
      let scrollAmount = 0;
      let slideTimer = setInterval(() => {
        direction === 'left' ? element.scrollLeft -= step : element.scrollLeft += step;
  
        scrollAmount += step;
        scrollAmount >= distance && clearInterval(slideTimer);
      }, speed);
    }
  
    function movePopulars(direction) {
      const speed = 8;
      const cardSize = parseInt(getComputedStyle(cardSlider.current.firstChild, null).minWidth);
      const cardMargin = parseInt(getComputedStyle(cardSlider.current.firstChild, null).marginRight);
      const distance = (cardSize + cardMargin) * 2;
      const step = 16;
  
      horizontalScroll(cardSlider.current, direction, speed, distance, step);
    }
  
    function openEndedToggle() {
      const state = toggle.current.getElementsByClassName("state")[0];
      const switches = toggle.current.getElementsByClassName("switches")[0];
  
      Array.from(switches.children).forEach((oneSwitch, i) => {
        if (!oneSwitch.classList.contains("active")) { state.style.transform = `translateX(${i * 100}%)` }
  
        oneSwitch.classList.toggle("active");
      });
  
      setIsOpenVotesShown(!isOpenVotesShown);
    }

    function setWinner(teams) {
      const redScore = teams.red.scores[teams.red.scores.length - 1];
      const blueScore = teams.blue.scores[teams.blue.scores.length - 1];

      if (redScore > blueScore) { return "red" }
      if (redScore < blueScore) { return "blue" }
      if (redScore === blueScore) { return "nobody" }
    }

    useEffect(() => {
      setIsLoading({
          popular: true,
          open: true,
          ended: true
      })
      api.get("/votes/popular", { params: { category } })
        .then(res => { setPopularVotes(res.data)})
        .catch((err) => console.log(err) )
        .finally(() => { setIsLoading({ ...isLoading, popular: false }) });

      api.get("/votes/open", { params: { category } })
        .then(res => { setOpenVotes(res.data) })
        .catch((err) => console.log(err) )
        .finally(() => { setIsLoading({ ...isLoading, open: false }) });

      api.get("/votes/ended", { params: { category } })
        .then(res => { setEndedVotes(res.data) })
        .catch((err) => console.log(err) )
        .finally(() => { setIsLoading({ ...isLoading, ended: false }) });
    }, []);
  
    return (
      <React.Fragment>
        <Head
          title="BLRD! Your Online Real-time Social Voting Game."
          description="Your Online Real-time Social Voting Game."
          url={`https://blrd.jez.hu`}
        />
        <div className="App">
          <Navigation create />
          <section className="padding-t-16 margin-b-24 margin-b-24--d margin-x-auto relative bg_color-red-blue-gradient">
            <div className="flex nowrap center-between max-width margin-x-auto margin-b-16 padding-x-24">
              <h3 className="color-white relative capitalize">Popular • {category ? category : "All"}</h3>
              <section className="flex wrap align-start none--m">
                <button className="bg_color-white-32 size-32 margin-r-16"
                  onClick={e => movePopulars("left")}
                > <i className="icon-arrow-left"></i> </button>
                <button className="bg_color-white-32 size-32"
                  onClick={e => movePopulars("right")}
                > <i className="icon-arrow-right"></i> </button>
              </section>
            </div>
            <section ref={cardSlider} className="card-slider padding-b-24 padding-b-32--d relative">
              { popularVotes.length !== 0
                ? popularVotes.map(vote => (
                  <Card
                    key={vote._id}
                    className="card-popular margin-r-16 margin-b-16"
                    vote={vote}
                  /> ))
                : isLoading.popular && <React.Fragment>
                    <CardPlaceholder className="card-popular margin-r-16 margin-b-16" delay={randomNumber(0, 4000)} />
                    <CardPlaceholder className="card-popular margin-r-16 margin-b-16" delay={randomNumber(0, 4000)}/>
                    <CardPlaceholder className="card-popular margin-r-16 margin-b-16" delay={randomNumber(0, 4000)}/>
                    <CardPlaceholder className="card-popular margin-r-16 margin-b-16" delay={randomNumber(0, 4000)}/>
                    <CardPlaceholder className="card-popular margin-r-16 margin-b-16" delay={randomNumber(0, 4000)}/>
                    <CardPlaceholder className="card-popular margin-r-16 margin-b-16" delay={randomNumber(0, 4000)}/>
                    <CardPlaceholder className="card-popular margin-r-16 margin-b-16" delay={randomNumber(0, 4000)}/>
                  </React.Fragment> }
            </section>
          </section>
          { !category && <section className="max-width margin-x-auto margin-b-24 padding-x-24">
            <h3 className="margin-b-16">Categories</h3>
            <section className="flex wrap">
              <Category
                url="/category/lifestyle"
                className="margin-r-8 margin-b-8"
                name="Lifestyle"
              />
              <Category
                url="/category/fashion%20&%20brands"
                className="margin-r-8 margin-b-8"
                name="Fashion & Brands"
              />
              <Category
                url="/category/food"
                className="margin-r-8 margin-b-8"
                name="Food"
              />
              <Category
                url="/category/tech"
                className="margin-r-8 margin-b-8"
                name="Tech"
              />
              <Category
                url="/category/animals"
                className="margin-r-8 margin-b-8"
                name="Animals"
              />
              <Category
                url="/category/culture"
                className="margin-r-8 margin-b-8"
                name="Culture"
              />
              <Category
                url="/category/gaming"
                className="margin-r-8 margin-b-8"
                name="Gaming"
              />
            </section>
          </section> }
          <section className="max-width margin-x-auto">
            <div className="flex justify-between margin-b-24 padding-x-24">
              <h3>Latest</h3>
              <div ref={toggle} className="toggle"
                onClick={openEndedToggle}
              >
                <div className="switches">
                  <div className="switch open active">Open</div>
                  <div className="switch ended">Ended</div>
                </div>
                <div className="state"></div>
              </div>
            </div>
            <section className="open flex row wrap padding-l-24 padding-r-8">
              { isOpenVotesShown && ((openVotes.length !== 0)
                ? openVotes.map(vote => (
                  <Card
                    key={vote._id}
                    className="card-latest margin-r-16 margin-b-16"
                    vote={vote}
                  /> ))
                : isLoading.open && <React.Fragment>
                    <CardPlaceholder className="card-latest margin-r-16 margin-b-16" delay={randomNumber(0, 4000)} />
                    <CardPlaceholder className="card-latest margin-r-16 margin-b-16" delay={randomNumber(0, 4000)} />
                    <CardPlaceholder className="card-latest margin-r-16 margin-b-16" delay={randomNumber(0, 4000)} />
                    <CardPlaceholder className="card-latest margin-r-16 margin-b-16" delay={randomNumber(0, 4000)} />
                  </React.Fragment>) }
              { !isOpenVotesShown && ((endedVotes.length !== 0)
                ? endedVotes.map(vote => (
                  <Card
                    key={vote._id}
                    className={`card-latest margin-r-16 margin-b-16`}
                    vote={vote}
                    winner={setWinner(vote.teams)}
                  /> ))
                : isLoading.ended && <React.Fragment>
                    <CardPlaceholder className="card-latest margin-r-16 margin-b-16" delay={randomNumber(0, 4000)} />
                    <CardPlaceholder className="card-latest margin-r-16 margin-b-16" delay={randomNumber(0, 4000)} />
                    <CardPlaceholder className="card-latest margin-r-16 margin-b-16" delay={randomNumber(0, 4000)} />
                    <CardPlaceholder className="card-latest margin-r-16 margin-b-16" delay={randomNumber(0, 4000)} />
              </React.Fragment>) }
            </section>
          </section>
          <Footer />
        </div>
      </React.Fragment>
    );
}