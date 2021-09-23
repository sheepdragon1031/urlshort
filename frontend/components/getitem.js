import CardPackage from "./card";

function Getitem ({urlList, deleUrl, putURL, putMeta}){
    return (
        <div>
            {urlList
                .sort((a, b) => b.created_at.localeCompare(a.created_at))
                .map((data, i) => (
                    <CardPackage key={i}  deleUrl={deleUrl} data={data} index={i} putURL={putURL} putMeta={putMeta}/>
                ))}
            
        </div>
    )
}

export default Getitem;
