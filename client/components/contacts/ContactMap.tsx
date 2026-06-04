'use client';

import { MapPin, Navigation } from 'lucide-react';
import { branch } from '@/libs/constants/ContactData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function ContactMap() {
    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${branch.coordinates.lat},${branch.coordinates.lng}&zoom=15`;

    return (
        <Card className="overflow-hidden">
            <div className="p-6 border-b border-border bg-gradient-to-r from-secondary/50 to-transparent">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="font-semibold text-foreground text-lg">Location Map</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Find us easily using the map below
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates.lat},${branch.coordinates.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                        >
                            <Navigation className="w-4 h-4" />
                            Get Directions
                        </a>
                    </Button>
                </div>
            </div>

            <div className="p-6">
                <div className="overflow-hidden rounded-xl border border-border shadow-md">
                    <iframe
                        title={`${branch.name} Location Map`}
                        src={mapSrc}
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                    />
                </div>

                <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground bg-secondary/30 rounded-lg p-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                        <strong className="text-foreground">Address:</strong> {branch.address}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">1</span>
                        </div>
                        <div>
                            <p className="font-medium text-foreground">By Car</p>
                            <p className="text-xs text-muted-foreground">Ample parking available with 24/7 security</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">2</span>
                        </div>
                        <div>
                            <p className="font-medium text-foreground">Public Transport</p>
                            <p className="text-xs text-muted-foreground">Multiple matatu routes stop near Upper Hill</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
