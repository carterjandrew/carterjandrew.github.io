import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mdx from '@mdx-js/rollup'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [
		mdx({
			rehypePlugins: [
				rehypePrism,
				rehypeSlug
			],
			remarkPlugins: [
					remarkGfm
			]
		}),
		react()
	],
})
