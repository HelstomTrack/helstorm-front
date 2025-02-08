import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface CardsInfosProps {
    title: string;
    description: string;
}
export default function  CardsInfos({title, description}: CardsInfosProps) {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{description}</p>
                </CardContent>
            </Card>
        </div>
    );
}