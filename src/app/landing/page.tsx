"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import {SubscriptionCards} from "@/components/subscriptionCard/subscription-cards";

export default function LandingPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="text-center py-20">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Votre coach personnel de poche</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Obtenez des programmes sportifs et alimentaires sur mesure, générés en fonction de vos besoins spécifiques.
                </p>
                <Button size="lg" className="mr-4">
                    Commencer gratuitement
                </Button>
                <Button size="lg" variant="outline">
                    Voir une démo
                </Button>
            </section>

            {/* How It Works Section */}
            <section className="py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "1. Définissez vos objectifs",
                            description: "Renseignez vos objectifs, votre niveau actuel et vos préférences.",
                        },
                        {
                            title: "2. Génération IA",
                            description: "Notre IA crée des programmes personnalisés en fonction de vos données.",
                        },
                        {
                            title: "3. Suivez vos progrès",
                            description: "Accédez à vos programmes et suivez votre évolution au fil du temps.",
                        },
                    ].map((step, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{step.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Features Section */}
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
                                <CheckCircle className="text-primary mr-2" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-primary-foreground rounded-lg p-8 my-16 text-center">
                <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre corps et votre santé ?</h2>
                <p className="mb-6">
                    Rejoignez des milliers d'utilisateurs satisfaits et commencez votre parcours fitness dès aujourd'hui.
                </p>
                <Button size="lg" variant="secondary">
                    Créer mon programme personnalisé
                </Button>
            </section>

            <SubscriptionCards />
            {/* Testimonials Section */}
            <section className="py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Marie L.",
                            text: "Grâce à cette app, j'ai enfin trouvé un programme qui me correspond. J'ai perdu 10kg en 3 mois !",
                        },
                        {
                            name: "Thomas R.",
                            text: "Les programmes s'adaptent parfaitement à mon emploi du temps chargé. Je n'ai plus d'excuse pour ne pas m'entraîner.",
                        },
                        {
                            name: "Sophie K.",
                            text: "J'adore la variété des exercices et des recettes. Je ne m'ennuie jamais et je vois des résultats concrets.",
                        },
                    ].map((testimonial, index) => (
                        <Card key={index}>
                            <CardContent className="p-6">
                                <p className="mb-4">"{testimonial.text}"</p>
                                <p className="font-semibold">{testimonial.name}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
                <div className="space-y-4">
                    {[
                        {
                            question: "Comment les programmes sont-ils générés ?",
                            answer:
                                "Nos algorithmes d'IA analysent vos objectifs, votre niveau de forme et vos préférences pour créer des programmes sur mesure.",
                        },
                        {
                            question: "Puis-je modifier mon programme ?",
                            answer: "Oui, vous pouvez ajuster votre programme à tout moment. L'IA s'adaptera en conséquence.",
                        },
                        {
                            question: "L'application convient-elle aux débutants ?",
                            answer: "Absolument ! Nos programmes s'adaptent à tous les niveaux, du débutant à l'athlète confirmé.",
                        },
                    ].map((faq, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{faq.question}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{faq.answer}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="text-center py-20">
                <h2 className="text-3xl font-bold mb-6">Commencez votre transformation dès aujourd'hui</h2>
                <p className="text-xl text-muted-foreground mb-8">
                    Rejoignez notre communauté et obtenez votre premier programme personnalisé gratuitement.
                </p>
                <Button size="lg">S'inscrire gratuitement</Button>
            </section>
        </main>
    )
}

