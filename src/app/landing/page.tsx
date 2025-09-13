"use client";

// ========= LandingPage (avec ancres) =========
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import CardsInfos from "@/components/CardsInfo/CardsInfos";
import CardsCommentary from "@/components/CardsInfo/CardsCommentary";
import BackgroundImage from "@/components/ImageComponents/BackgroundImage";
import SubscriptionCards from "@/components/SubscriptionCard/SubscriptionCards";
import AnimatedSection from "@/hooks/AnimatedSection";
import Features from "@/components/Features/Features";

export default function LandingPage() {
    // Active le scroll doux pour la page (au cas où la classe Tailwind `scroll-smooth` n'est pas appliquée sur <html>)
    useEffect(() => {
        const prev = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "smooth";
        return () => { document.documentElement.style.scrollBehavior = prev };
    }, []);

    return (
        <>
            {/* HERO */}
            <div>
                <BackgroundImage
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    imgSrc="/img-sport.jpg"
                >
                    <section id="hero" className="text-center py-20 scroll-mt-24">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            Obtenez votre plan alimentaire et sportif en un clic !
                        </h1>
                        <p className="text-xl text-white mb-8">
                            Obtenez des programmes sportifs et alimentaires sur mesure, générés en fonction de vos besoins spécifiques.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <Link href="/login">
                                <Button variant="secondary" className="text-sm/6 font-semibold text-gray-900 transition-all duration-300 hover:scale-110">
                                    Commencer maintenant
                                </Button>
                            </Link>
                        </div>
                    </section>
                </BackgroundImage>
            </div>

            {/* CONTENU */}
            <div className="container mx-auto px-4 py-8">
                <AnimatedSection>
                    <section id="features" className="scroll-mt-24">
                        <Features />
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section id="cta-1" className="bg-primary text-primary-foreground rounded-lg p-8 my-16 text-center scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-4">
                            Prêt à transformer votre corps et votre santé ?
                        </h2>
                        <p className="mb-6">
                            Rejoignez des milliers d&apos;utilisateurs satisfaits et commencez votre parcours fitness dès aujourd&apos;hui.
                        </p>
                        <Link href="#pricing">
                            <Button variant="secondary" className="text-sm/6 font-semibold text-gray-900 transition-all duration-300 hover:scale-110">
                                Voir les offres
                            </Button>
                        </Link>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section id="how-it-works" className="py-16 scroll-mt-24">
                        <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl text-center mb-12">
                            Comment ça marche ?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <CardsInfos
                                title="1. Remplis ton profil"
                                description="Objectifs, morphologie, niveau sportif, habitudes alimentaires."
                            />
                            <CardsInfos
                                title="2. Reçois ton programme personnalisé"
                                description="Entraînements et plans alimentaires générés automatiquement."
                            />
                            <CardsInfos
                                title="3. Applique et progresse"
                                description="Suis tes performances et reçois des ajustements réguliers."
                            />
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section id="pricing" className="scroll-mt-24">
                        <SubscriptionCards />
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section id="testimonials" className="py-16 scroll-mt-24">
                        <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <CardsCommentary name="Ilyes.D" text="Grâce à cette app, j&apos;ai enfin trouvé un programme qui me correspond. J'ai perdu 10kg en 3 mois !" />
                            <CardsCommentary name="Baptiste.L" text="Les programmes s&apos;adaptent parfaitement à mon emploi du temps chargé. Je n'ai plus d'excuse pour ne pas m'entraîner" />
                            <CardsCommentary name="Antoine.G" text="J&apos;adore la variété des exercices et des recettes. Je ne m'ennuie jamais et je vois des résultats concrets." />
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection>
                    <section id="cta-2" className="text-center py-20 scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6">
                            Commencez votre transformation dès aujourd&apos;hui
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Rejoignez notre communauté et obtenez votre premier programme personnalisé gratuitement.
                        </p>
                        <Link href="/register">
                            <Button size="lg">S&apos;inscrire gratuitement</Button>
                        </Link>
                    </section>
                </AnimatedSection>
            </div>
        </>
    );
}