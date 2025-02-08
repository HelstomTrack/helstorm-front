import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface CardsInfosProps {
    title: string;
    description: string;
}
export default function  CardsInfos({title, description}: CardsInfosProps) {
    return (
        <div>
            <Card className="transition-all duration-300 hover:scale-110">
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