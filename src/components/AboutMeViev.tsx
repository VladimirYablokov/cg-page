"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AboutMeView() {
    const { data, error, isLoading } = useSWR("/api/profile", fetcher);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
            </div>
        );
    }

    if (error || !data) {
        return <p className="text-center text-gray-500">Ошибка загрузки профиля</p>;
    }

    return (
        <Card className="max-w-lg mx-auto mt-6 shadow-lg rounded-2xl">
            <CardHeader className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={data.image || ""} />
                    <AvatarFallback>{data?.bio ? data.bio[0] : "?"}</AvatarFallback>
                </Avatar>
                <CardTitle>{data.bio || "Нет описания"}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-gray-600">
                    {data.website ? (
                        <a href={data.website} target="_blank" className="text-blue-500">
                            {data.website}
                        </a>
                    ) : (
                        "Нет ссылки"
                    )}
                </p>
            </CardContent>
        </Card>
    );
}
