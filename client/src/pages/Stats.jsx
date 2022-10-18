import { useParams } from "react-router-dom";

export default function Stats() {
    const { vote } = useParams();
    return (
        <p>This is the Statistics page</p>
    )
}