export const pushToDataLayer = (
    data: Record<string, any>
) => {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
};