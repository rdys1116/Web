import CardContainer from "../../frontend/src/component/Display-Card/CardContainer";
import DropdownSelectType from "../DisplayMediaPage/DropdownSelectType";

export const MediaPage = (props) => {
    const { 
        handleSelect, title,
        type, media, 
        handleClick,
        loadMore
    } = props;

    return (
        <div>
            <DropdownSelectType
            title={title}
            handleSelect={handleSelect}
            type={type} />
            {
                <CardContainer
                movies={media}
                button={{
                    onClick: handleClick,
                    ref: loadMore,
                    text: 'Load More'
                }} />
            }
        </div>
    )
}