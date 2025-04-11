export default interface NextPageProps<SlugType = string> {
	params: { slug: SlugType };
	searchParams?: { [key: string]: string  | undefined };
}