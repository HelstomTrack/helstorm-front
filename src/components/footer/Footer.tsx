"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    return (
        <Card className="w-full mt-8">
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">À propos</h3>
                    <p className="text-sm text-muted-foreground">
                        Notre entreprise s'engage à fournir des solutions innovantes pour nos clients.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Liens rapides</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                Accueil
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                    <p className="text-sm text-muted-foreground mb-2">Inscrivez-vous pour recevoir nos dernières nouvelles.</p>
                    <div className="flex space-x-2">
                        <input type="email" placeholder="Votre email" className="flex-grow px-3 py-2 text-sm border rounded-md" />
                        <Button>S'inscrire</Button>
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex flex-col md:flex-row justify-between items-center p-6">
                <div className="text-sm text-muted-foreground mb-4 md:mb-0">© 2024 Votre Entreprise. Tous droits réservés.</div>
                <div className="flex space-x-4">
                    <Button variant="ghost" size="icon">
                    </Button>
                    <Button variant="ghost" size="icon">
                    </Button>
                    <Button variant="ghost" size="icon">
                    </Button>
                    <Button variant="ghost" size="icon">
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

