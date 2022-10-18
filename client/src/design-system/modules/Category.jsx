export default function Category(props) {
    return (
        <a href={props.url} className={`category ${props.className && props.className}`.trim()}>{props.name}</a>
    )
}