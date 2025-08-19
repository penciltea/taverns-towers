import { Npc } from "@/interfaces/npc.interface";

interface Props{
    name: string;
    pronouns: string;
    race: string;
    id: string;
}

export default function EntityLinkList({ name, pronouns, race, id }: Props){
    return (
        <p>name: {name} </p>
    )
}