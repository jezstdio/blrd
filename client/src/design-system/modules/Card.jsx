import { shadeColor } from "../../utils";

export default function Card(props) {
    const calculateSize = (redScore, blueScore) => blueScore / (redScore + blueScore) * 100;

    function handleColors(color) {
        switch(props.winner) {
            case "red": return [props.vote.teams.red.color, shadeColor(props.vote.teams.red.color, -48)]
            case "blue": return [props.vote.teams.blue.color, shadeColor(props.vote.teams.blue.color, -48)].reverse()
            case "nobody":  return ["#1A1A1A", "#000000"]
            default: return [color, color];
        }
    }

    return (
        <a
            className={`card ${props.className}`.trim()}
            href={`/${props.vote._id}`}
            style={{ backgroundColor: handleColors(props.vote.teams.red.color)[0] }}
        >
            <div
                className="vote-status"
                style={{
                    height: `${calculateSize(props.vote.teams.red.scores[props.vote.teams.red.scores.length - 1], props.vote.teams.blue.scores[props.vote.teams.blue.scores.length - 1])}%`,
                    backgroundColor: handleColors(props.vote.teams.blue.color)[1]
                }}
            >
                <span className="red-team">
                    <span
                        className={`padding-x-16`}
                        style={{
                            color: props.winner === "blue" ? shadeColor(handleColors("blue")[0], -64) : ''
                        }}
                    >
                        {props.vote.teams.red.name} {`${props.winner && props.winner === "red" ? "🎉" : ''}`}</span>
                </span>
                <span className="blue-team">
                    <span
                        className={`padding-x-16`}
                        style={{
                            color: props.winner === "red" ? shadeColor(handleColors("red")[0], -64) : ''
                        }}
                    >
                    {props.vote.teams.blue.name} {`${props.winner && props.winner === "blue" ? "🎉" : ''}`}</span>
                </span>
            </div>
        </a>
    )
}

export function CardPlaceholder(props) {
    return (
        <div className={`card opacity-48 bg_color-red--light ${props.className}`}>
            <div
                className={`vote-status placeholder animation-card_loading bg_color-blue--light`}
                style={{
                    animationDelay: `${props.delay}ms`
                }}
            ></div>
        </div>
    )
}