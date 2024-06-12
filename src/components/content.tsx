import { capitalizeAndReplace } from "../layouts/root"
import AssetContext from "../assetContext"
import { useContext, useEffect, useState } from "react"
import Markdown from "react-markdown"
import { useParams } from "react-router-dom"
import remarkGfm from "remark-gfm"

export default function MarkdownRenderer() {
    const assets: any = useContext(AssetContext)
    const { sectionName, topicName } = useParams()
    const [markdown, setMarkdown] = useState<string>()

    async function fetchMarkdown() {
        var contentLocation = undefined;
        if (!sectionName) contentLocation = assets['index'];
        else if (!topicName) contentLocation = assets[sectionName]['index'];
        else {
            contentLocation = assets[sectionName][topicName];
        }
        const content = await (await fetch(contentLocation)).text()
        setMarkdown(content)
    }

    useEffect(() => {
        fetchMarkdown()
    })

    if (!markdown) {
        return (
            <div id='mainContent'>
                <div className='center'>
                    <h1>Loading Content...</h1>
                </div>
            </div>
        )
    }

    return (
        <div id='content'>
            <div id='mainContent'>
                <Markdown remarkPlugins={[remarkGfm]}>
                    {markdown}
                </Markdown>
                <hr />
                {sectionName ?
                    <>
                        <div id='linkContent'>
                            {Object.keys(assets[sectionName]).filter(name => name !== 'index' && name !== 'images').map((asset) => (
                                <a href={`${sectionName}/${asset}`} key={asset}>
                                    {capitalizeAndReplace(asset)}
                                </a>
                            ))}
                        </div>
                    </> :
                    <div id='linkContent'>
                        <a href='/resume'>Resume</a>
                        <a href='/Projects'>Projects</a>
                        <a href='/Blog'>Blog</a>
                        <a href='/Other'>Other</a>
                    </div>
                }
            </div>
        </div>
    )
}
