import React, { useState } from 'react';
import { connect } from "react-redux";
import { AppState } from "../../store/rootReducer";
import TextField from '@mui/material/TextField';

import AreaTitle from "../../components/AreaTitle";
import Checkbox from "../../components/Checkbox";
import Error, { ErrorSize } from "../../shared/Error";
import Loading from "../../shared/Loading";
import { setActivePage, setTag, deleteTag } from "../../store/filters/actions";
import { fetchItemsByFilter } from "../../store/items/actions";
import { TagsState } from "../../store/tags/types";

import "./index.scss";

// props from connect mapDispatchToProps
interface DispatchProps {
    fetchItemsByFilter: () => Promise<void>;
    deleteTag: (tag: string) => void;
    setActivePage: (activePage: number) => void;
    setTag: (tag: string) => void;
}

interface StateProps {
    tagsState: TagsState;
}

const TagArea: React.FunctionComponent<DispatchProps & StateProps> = (props) => {
    const { tagsState, fetchItemsByFilter, deleteTag, setActivePage, setTag } = props;
    const { error: isTagsError, pending: isTagsPending, tags } = tagsState;

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchedTags, setSearchedTags] = useState<string[]>([]);

    const handleSelectedBrands = (tag: string) => {
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

    const handleSearchBrands = (searchText: string) => {
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

    return <>
        <AreaTitle>Tags</AreaTitle>
        <div className="tag-area__wrapper">
            {isTagsPending && <Loading />}
            {isTagsError && <Error size={ErrorSize.lg} />}
            {tags.length > 0 && !isTagsPending && <div className="tag-area__checkbox-group">
                <TextField sx={{
                    marginTop: "1.6vw",
                    marginBottom: "1.6vw"
                }}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="Search tag"
                    onChange={(e) => handleSearchBrands(e.target.value)} />
                <div className="tag-area__checkbox-wrapper">
                    {(searchedTags.length > 0 ? searchedTags : tags).map((tag, index) =>
                        <Checkbox
                            key={`tag-area__checkbox-${index}`}
                            onChange={() => handleSelectedBrands(tag)}
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
    setTag
}

export default connect(mapStateToProps, mapDispatchToProps)(TagArea);