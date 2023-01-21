import React, { useState } from 'react';
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import TextField from '@mui/material/TextField';

import AreaTitle from "../../components/AreaTitle";
import Checkbox from "../../components/Checkbox";
import Error, { ErrorSize } from "../../shared/Error";
import Loading from "../../shared/Loading";
import { setActivePage, setTag, deleteTag, clearTag } from "../../store/filters/actions";
import { fetchItemsByFilter } from "../../store/items/actions";
import { TagsState } from "../../store/tags/types";

import "./index.scss";

// props from connect mapDispatchToProps
interface DispatchProps {
    fetchItemsByFilter: () => Promise<void>;
    deleteTag: (tag: string) => void;
    setActivePage: (activePage: number) => void;
    setTag: (tag: string) => void;
    clearTag: () => void;
}

interface StateProps {
    tagsState: TagsState;
}

const TagArea: React.FunctionComponent<DispatchProps & StateProps> = (props) => {
    const { tagsState, fetchItemsByFilter, deleteTag, setActivePage, setTag, clearTag } = props;
    const { error: isTagsError, pending: isTagsPending, tags } = tagsState;

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchedTags, setSearchedTags] = useState<string[]>([]);

    const handleSelectedTags = (tag: string) => {
        const isSelectedTag = selectedTags.includes(tag);

        if (!isSelectedTag) {
            setSelectedTags([...selectedTags, tag]);
            handleSortingByTag(tag);
        } else {
            const indexTag = selectedTags.indexOf(tag);
            selectedTags.splice(indexTag, 1);

            const copySelectedTags = selectedTags;
            setSelectedTags([...copySelectedTags]);
            handleRemovalTag(tag);
        }
    };

    const handleSearchTags = (searchText: string) => {
        const results = tags.filter(tag => {
            return tag.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
        });
        setSearchedTags(results);
    }

    const handleSortingByTag = (tag: string) => {
        setActivePage(1);
        setTag(tag);
        fetchItemsByFilter();
    }

    const handleRemovalTag = (tag: string) => {
        setActivePage(1);
        deleteTag(tag);
        fetchItemsByFilter();
    }

    const resetTags = () => {
        setSelectedTags([]);
        clearTag();
        fetchItemsByFilter();
    }

    return <>
        <AreaTitle>Tags</AreaTitle>
        <div className="tag-area__wrapper">
            {isTagsPending && <Loading />}
            {isTagsError && <Error size={ErrorSize.lg} />}
            {tags.length > 0 && !isTagsPending && <div className="tag-area__checkbox-group">
                <TextField sx={{
                    marginTop: "1.6vw",
                    marginBottom: "0.8vw"
                }}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="Search tag"
                    onChange={(e) => handleSearchTags(e.target.value)} />
                <div className={`tag-area__clear-wrapper ${selectedTags.length > 0 ? "clickable" : "disabled"}`}
                    onClick={resetTags}>
                    <span className="material-icons tag-area__clear-icon">
                        {"clear"}
                    </span>
                    <div className="material-icons tag-area__clear-text">
                        Clear
                    </div>
                </div>
                <div className="tag-area__checkbox-wrapper">
                    {(searchedTags.length > 0 ? searchedTags : tags).map((tag, index) =>
                        <Checkbox
                            key={`tag-area__checkbox-${index}`}
                            onChange={() => handleSelectedTags(tag)}
                            label={tag}
                            value={selectedTags.includes(tag)} />
                    )}
                </div>
            </div>}
        </div>
    </>
}

const mapStateToProps = (state: AppState) => {
    return {
        tagsState: state.tags
    }
}

const mapDispatchToProps = {
    fetchItemsByFilter,
    deleteTag,
    setActivePage,
    setTag,
    clearTag
}

export default connect(mapStateToProps, mapDispatchToProps)(TagArea);