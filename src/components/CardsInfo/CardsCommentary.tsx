import {Card, CardContent} from "@/components/ui/card";

interface CardsCommentaryProps {
    name: string;
    text: string;
}
export default function  CardsCommentary({name, text}: CardsCommentaryProps) {
    return (
        <div>
            <Card >
                <CardContent className="p-6">
                    <p className="mb-4">{text}</p>
                    <p className="font-semibold">{name}</p>
                </CardContent>
            </Card>
        </div>
    );
}