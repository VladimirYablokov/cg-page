"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

export default function AboutMeView({ profile, isLoading }: { profile: any; isLoading: boolean }) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="text-center text-gray-500 py-10">
                Профиль ещё не заполнен.
            </div>
        );
    }

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader className="flex flex-col items-center">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.image || ""} alt={profile.bio || "Аватар"} />
                    <AvatarFallback>?</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{profile.bio || "Без описания"}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                {profile.website && (
                    <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        {profile.website}
                    </a>
                )}
            </CardContent>
        </Card>
    );
}
