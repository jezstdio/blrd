// title: BLRD! Your Online Real-time Social Voting Game

import { Helmet } from 'react-helmet';

export default function Head(props) {
    return (
        <Helmet>
            <title>{props.title}</title>

            <meta name="theme-color" content={props.color ? props.color : `#ffffff`} media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content={props.color ? props.color : `#1A1A1A`} media="(prefers-color-scheme: dark)" />

            { /* Facebook Open Graph */}
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:url" content={props.url} />
            <meta property="og:image" content="/share.jpg" /> 

            { /* Twitter Summary Card */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@BLRDio" />
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content="/share.jpg" />

            <style>
                {`
                    body { background-color: ${props.color}; }
                `}
            </style>
        </Helmet>
    )
}