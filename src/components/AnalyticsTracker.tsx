'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const siteId = "a4490d26-e7f1-4ea9-bf86-9327eb39ec60";
        const endpoint = "http://localhost:3004/api/analytics/track";

        function track(url: string) {
            if (!url) url = window.location.pathname;

            const data = {
                websiteId: siteId,
                url: url,
                referrer: document.referrer,
                userAgent: navigator.userAgent
            };

            fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).catch(console.error);
        }

        // Construct the full URL including search params if needed, 
        // but the original script just used window.location.pathname.
        // We will stick to pathname to match original intent, 
        // but trigger on searchParams change too if desired.
        // However, usually analytics tracking wants the full relative path.
        const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

        track(url);

    }, [pathname, searchParams]);

    return null;
}
