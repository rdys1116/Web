import { useEffect, useState } from "react";
import { getFullUrl, useFetchData } from "../../../../common-functions/functions";

function useGetCollectionDetails(collectionInfo){
    const [isError, isLoading, collection] = useFetchData(getFullUrl(`collection/${collectionInfo.id}`));
    console.log(collectionInfo);
    console.log(collection.parts);

    return [
        isError, isLoading, collection
    ];
}

export default useGetCollectionDetails;