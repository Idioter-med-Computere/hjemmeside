export function getSlug(link: string): string {
    try {
        return link.split('/').filter(Boolean).pop() ?? ''
    } catch {
        return ''
    }
}