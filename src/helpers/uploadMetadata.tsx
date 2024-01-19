import { Metaplex, toMetaplexFile } from "@metaplex-foundation/js";
import { NftData } from "..";
import * as fs from 'fs';

// helper function to upload image and metadata
export async  function  uploadMetadata(
    metaplex: Metaplex,
    nftData: NftData,
): Promise<string> {
    
    // file to buffer
    const buffer = fs.readFileSync("src/" + nftData.imageFile);

    // buffer to metaplex file
    const file = toMetaplexFile(buffer, nftData.imageFile);

    // upload image and get image uri
    const imageUri = await metaplex.storage().upload(file);
    console.log("image uri:", imageUri);

    // upload metadata and get metadata uri (off chain metadata)
    const { uri } = await metaplex.nfts().uploadMetadata({
        name: nftData.name,
        symbol: nftData.symbol,
        description: nftData.description,
        image: imageUri,
    });

    console.log("metadata uri:", uri);
    return uri;
}