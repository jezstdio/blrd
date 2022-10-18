import { Twitter, Patreon, KoFi } from "./Icon";

export default function Footer(props) {
    return (
        <footer className="padding-x-24 max-width margin-x-auto padding-t-24 padding-b-40">
            <section className="flex center-between row">
                <section>
                    <small className="block font_size-10">Made with Love & Curiosity</small>
                    <small className="block font_size-10">©2022 All Rights reserved</small>
                </section>
                <section className="flex row">
                    <KoFi />
                    {/* <Patreon /> */}
                    <Twitter />
                </section>
            </section>
        </footer>
    )
}