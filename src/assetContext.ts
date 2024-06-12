import { createContext } from "react";

const AssetContext = createContext({});

function trimFileExt(name: string) {
    return name.replace(/\.[^/.]+$/, "");
}

function genAssetObjectRecurse(objectDirectories: string[], assetImport: any, existingStructure: any): any {
    if (existingStructure) {
        if (objectDirectories.length === 1) return { ...existingStructure, [trimFileExt(objectDirectories[0])]: assetImport }
        else return {
            ...existingStructure,
            [objectDirectories[0]]: genAssetObjectRecurse(
                objectDirectories.slice(1),
                assetImport,
                existingStructure[objectDirectories[0]]
            )
        }
    }
    if (objectDirectories.length === 1) return { [trimFileExt(objectDirectories[0])]: assetImport }
    else return {
        [objectDirectories[0]]: genAssetObjectRecurse(
            objectDirectories.slice(1),
            assetImport,
            undefined
        )
    }
}

export function genAssetObject() {
    const rawAssets = require.context('./assets', true);
    const rawAssetKeys = rawAssets.keys();
    var assets = {};
    for (const asset of rawAssetKeys) {
        const assetDirectories = asset.slice(2).split('/');
        if (assetDirectories.length === 1) {
            (assets as any)[trimFileExt(assetDirectories[0])] = rawAssets(asset);
        } else {
            (assets as any)[assetDirectories[0]] = genAssetObjectRecurse(
                assetDirectories.slice(1),
                rawAssets(asset),
                (assets as any)[assetDirectories[0]]
            )
        }
    }
    return assets;
}

export default AssetContext;