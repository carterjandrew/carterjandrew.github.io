import LazyMdx, { LazyMdxProps } from '../components/lazyMdx';
import CategoryIndex, { NodeMappingItem } from '../components/categoryIndex';

const blogPreviewElements: NodeMappingItem[] = Object.entries(
	import.meta.glob('../blog-previews/**.mdx'))
	.map(([key, mdxFunction]) => ({
		path: key.replace('../blog-previews/', '').replace('.mdx', ''),
		element: <LazyMdx importHook={mdxFunction as LazyMdxProps['importHook']} />,
	}),
);

export default function BlogIndex() {
	return (
		<CategoryIndex
			path="/blog"
			previewElements={blogPreviewElements}
		/>
	)
}
