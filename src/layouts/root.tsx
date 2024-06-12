import { NavLink, Outlet, useParams } from 'react-router-dom'
import '../App.css'
import { useContext } from 'react'
import AssetContext from '../assetContext'

export function capitalizeAndReplace(str: string) {
    if (str !== str.toLowerCase()) return str.split('-').join(' ');
    let words = str.split('-');
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
}

export default function Root() {
    const { sectionName, topicName } = useParams()
    const assets: any = useContext(AssetContext);

    const topics = topicName? Object.keys(assets[sectionName!]).filter((name: string) => name !== 'index'): ['filler']
    const topicIndex = topicName? topics.findIndex((name: string) => name === topicName)! : -1
    const prevTopic = topicIndex > 0? topics[topicIndex - 1] : topics[topics.length -1]
    const nextTopic = topicIndex < topics.length - 1? topics[topicIndex + 1]: topics[0]

    return (
        <div id='wrapper'>
            <div id='gapper'>
                <div id='navBar' className='navBar'>
                    <NavLink to='/'>
                        Carter Andrew
                    </NavLink>
                    <div id='title'>
                        <h2>{
                            sectionName ? topicName ?
                                `${capitalizeAndReplace(sectionName)} / ${capitalizeAndReplace(topicName)}`
                                :
                                `${capitalizeAndReplace(sectionName)}`
                                :
                                `Welcome!`
                        }</h2>
                    </div>
                    <NavLink to={`resume`}>Resume</NavLink>
                    <NavLink to={`projects`}>Projects</NavLink>
                    <NavLink to={`blog`}>Blog</NavLink>
                    <NavLink to={`other`}>Other</NavLink>
                </div>
                <Outlet />
                {topicName ?
                    <div id='footer' className='navBar'>
                        <NavLink
                            to={`${sectionName!
                                }/${prevTopic
                                }`}>
                                Prev: {capitalizeAndReplace(prevTopic)}
                        </NavLink>
                        <NavLink
                            to={`${sectionName!
                                }/${topicName
                                }`}>
                                Current: {capitalizeAndReplace(topicName)}
                        </NavLink>
                        <NavLink
                            to={`${sectionName!
                                }/${nextTopic
                                }`}>
                                Next: {capitalizeAndReplace(nextTopic)}
                        </NavLink>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    )
}
