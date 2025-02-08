"use client";
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import CardsInfos from "@/components/CardsInfo/CardsInfos";
import CardsCommentary from "@/components/CardsInfo/CardsCommentary";
import BackgroundImage from "@/components/ImageComponents/BackgroundImage";
import SubscriptionCards from "@/components/SubscriptionCard/SubscriptionCards";


export default function LandingPage() {
    return (
        <>
            <div>
                <BackgroundImage className="absolute top-0 left-0 w-full h-full object-cover" imgSrc={"/img-sport.jpg"}>
                    <section className="text-center py-20">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Votre coach personnel de
                            poche</h1>
                        <p className="text-xl text-white mb-8">
                            Obtenez des programmes sportifs et alimentaires sur mesure, générés en fonction de vos
                            besoins
                            spécifiques.
                        </p>
                        <Button size="lg" className="mr-4 bg-gray-900">
                            Commencer gratuitement
                        </Button>
                        <Button size="lg" variant="secondary">
                            Voir une démo
                        </Button>
                    </section>
                </BackgroundImage>
            </div>
            <div className="container mx-auto px-4 py-8">
                <section className="py-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <CardsInfos title="1. Définissez vos objectifs" description="Renseignez vos objectifs, votre niveau actuel et vos préférences."/>
                        <CardsInfos title="2. Génération IA" description="Notre IA crée des programmes personnalisés en fonction de vos données."/>
                        <CardsInfos title="3. Suivez vos progrès" description="Accédez à vos programmes et suivez votre évolution au fil du temps."/>
                    </div>
                </section>

                <section className="py-16 bg-muted rounded-lg">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités clés</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                "Programmes d'entraînement personnalisés",
                                "Plans alimentaires adaptés à vos goûts",
                                "Ajustement en temps réel selon vos progrès",
                                "Conseils d'experts en nutrition et fitness",
                                "Suivi de vos performances et statistiques",
                                "Communauté de soutien et motivation",
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <CheckCircle className="text-primary mr-2"/>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-primary text-primary-foreground rounded-lg p-8 my-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre corps et votre santé ?</h2>
                    <p className="mb-6">
                        Rejoignez des milliers d'utilisateurs satisfaits et commencez votre parcours fitness dès
                        aujourd'hui.
                    </p>
                    <Button size="lg" variant="secondary">
                        Créer mon programme personnalisé
                    </Button>
                </section>

                <SubscriptionCards/>
                <section className="py-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <CardsCommentary name='Ilyes.D' text="Grâce à cette app, j'ai enfin trouvé un programme qui me correspond. J'ai perdu 10kg en 3 mois !"/>
                        <CardsCommentary name='Baptiste.L' text="Les programmes s'adaptent parfaitement à mon emploi du temps chargé. Je n'ai plus d'excuse pour ne pas m'entraîner"/>
                        <CardsCommentary name='Antoine.G' text="J'adore la variété des exercices et des recettes. Je ne m'ennuie jamais et je vois des résultats concrets."/>
                    </div>
                </section>


                <section className="text-center py-20">
                    <h2 className="text-3xl font-bold mb-6">Commencez votre transformation dès aujourd'hui</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Rejoignez notre communauté et obtenez votre premier programme personnalisé gratuitement.
                    </p>
                    <Button size="lg">S'inscrire gratuitement</Button>
                </section>
            </div>

        </>
    )
}

