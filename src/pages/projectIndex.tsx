import LazyMdx, { LazyMdxProps } from '../components/lazyMdx';
import CategoryIndex, { NodeMappingItem } from '../components/categoryIndex';


const projectPreviewElements: NodeMappingItem[] = Object.entries(import.meta.glob('../project-previews/**.mdx')).map(([key, mdxFunction]) => ({
	path: key.replace('../project-previews/', '')
		.replace('.mdx', ''),
	element: <LazyMdx
		key={key}
		importHook={mdxFunction as LazyMdxProps['importHook']}
	/>,
}));

export default function ProjectsIndex() {
	return (
		<CategoryIndex
			path="/projects"
			previewElements={projectPreviewElements}
		/>
	)
}
