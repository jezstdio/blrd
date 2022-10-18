import React from "react";
import Head from "../design-system/modules/Head";
import Navigation, { NavigationElements } from "../design-system/modules/Navigation";
import Footer from "../design-system/modules/Footer";

export default function About() {
    return (
        <React.Fragment>
            <Head
                title="About us | BLRD! Your Online Real-time Social Voting Game."
                description="Your Online Real-time Social Voting Game."
                url={`https://blrd.jezstd.io/about`}
            />
            <Navigation />
            <div class="max-width margin-x-auto margin-t-16">
                <div class="flex--d">
                    <article class="padding-x-32">
                        <h1 class="font_size-48 color-red--light margin-b-32 text-width">
                            <span class="block color-blue--light font_size-16">About Us</span>
                            Welcome to <span class="color-blue--light">BL</span>RD!
                        </h1>
                        <section class="margin-b-32 text-width">
                            <h2 class="margin-b-16">What is this site?</h2>
                            <p class="margin-b-24">Life isn't that black and white! Of course not, because it's BLUE and RED! Got it?</p>
                            <p class="margin-b-24">It's a fun, real-time, social voting game! We are not only interested in how much votes does a topic gets but, by allowing you to cast multiple votes, we can see how IMPORTANT a topic is for a certain group.</p>
                            <p class="margin-b-24">To be frank, we are just incredibly interested about the opinion of people, in many-many topics! It's time to DECIDE! Dark vs Milk Chocolate, Cats vs Dogs Ketchup or Mustard. It's anonimous and fun, so lets get started tell us whats important to you!</p>
                        </section>
                        {/* <section class="margin-b-32 text-width">
                            <h2 class="margin-b-16">Sponsored Votes</h2>
                            <p class="margin-b-24">Not sure about a product or way to go? ASK the actual users! This site will give you amazing insight into not just the volume of interest but the actual INTEREST in a particular area. Try it out now:</p>
                        </section>
                        <section class="margin-b-32 text-width">
                            <h2 class="margin-b-16">Every help counts</h2>
                            <p class="margin-b-24">Our servers need to be maintained to give you the best experience possible. Sponsor a vote, give a $ on Patreon or just spread a vote important to you. Thank you for using our site, You are awesome! :)</p>
                            <section class="flex justify-center column">
                                <span>be part of the BLRD! family</span>
                            </section>
                        </section>
                        <section class="margin-b-32 text-width">
                            <div class="flex row justify-between align-center margin-b-16">
                                <h2>Privacy Policy</h2>
                            </div>
                            <div class="privacy">
                                <p class="margin-b-24">
                                    Your privacy is important to us.<br />
                                    BLRD!'s policy to respect your privacy regarding any 
                                    information we may collect from you across our 
                                    website, https://blrd.io, and other sites we own and 
                                    operate.
                                </p>
                                <p class="margin-b-24">
                                    We only ask for personal information when we truly 
                                    need it to provide a service to you. We collect it by 
                                    fair and lawful means, with your knowledge and 
                                    consent. We also let you know why we're collecting 
                                    it and how it will be used.
                                </p>
                                <p class="margin-b-24">
                                    We only retain collected information for as long as 
                                    necessary to provide you with your requested 
                                    service. What data we store, we'll protect within 
                                    commercially acceptable means to prevent loss and 
                                    theft, as well as unauthorized access, disclosure, 
                                    copying, use or modification.
                                </p>
                                <p class="margin-b-24">
                                    We don't share any personally identifying 
                                    information publicly or with third-parties, except 
                                    when required to by law. <br />
                                    Our website may link to external sites that are not 
                                    operated by us (e.g.: Twitter, Instagram and our 
                                    Patreon). Please be aware that we have no control 
                                    over the content and practices of these sites, and 
                                    cannot accept responsibility or liability for their 
                                    respective privacy policies.
                                </p>
                                <p class="margin-b-24">
                                    1. Measuring Website Usage<br />
                                    Google Analytics is in use to collect information 
                                    about how visitors use this site. This provides us 
                                    with important information that can enable the site 
                                    to work better. We do not link this information to 
                                    your name or address.
                                </p>
                                <p class="margin-b-24">
                                    2. Third party services<br />
                                    You may access other third-party services through 
                                    the Services, for example by clicking on links to 
                                    those third-party services from within the 
                                    Services. We are not responsible for the privacy 
                                    policies and/or practices of these third-party 
                                    services, and we encourage you to carefully review 
                                    their privacy policies.
                                </p>
                                <p class="margin-b-24">
                                    3. Advertising<br />
                                    We partner with a third party ad network (AdSense) 
                                    to display advertising on our Web site. Our ad 
                                    network partner uses cookies and Web beacons to 
                                    collect information about your activities on this and 
                                    other websites to provide you targeted advertising 
                                    based upon your interests.
                                </p>
                                <p class="margin-b-24">
                                    You are free to refuse our request for your personal 
                                    information, with the understanding that we may 
                                    be unable to provide you with some of your desired 
                                    services.
                                </p>
                                <p class="margin-b-24">
                                    Your continued use of our website will be regarded 
                                    as acceptance of our practices around privacy and 
                                    personal information. If you have any questions 
                                    about how we handle user data and personal 
                                    information, feel free to contact us.
                                </p>
                                <p class="margin-b-24">
                                    This Privacy Policy may be modified from time to 
                                    time, so please review it frequently. If we 
                                    materially change the ways in which we use or 
                                    share personal information previously collected 
                                    from you through our Service, we will notify you 
                                    through our Service.<br />
                                    Changes to Privacy Policy will appear on this page, 
                                    and the Privacy Policy modification will be updated 
                                    (date in the bottom of this page).
                                </p>
                                <p>This policy is effective as of 20 December 2019.</p>
                            </div>
                        </section> */}
                    </article>
                    <div class="padding-x-32 none--m">
                        <NavigationElements activeLink="about" />
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}