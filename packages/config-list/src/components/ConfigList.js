import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import memoize from 'memoize-one';

import { itemsShape, settingsShape } from '../utils/shapes';
import bind from '../utils/bind';
import DefaultSelectRenderer from './SelectRenderer';
import DefaultListRenderer from './ListRenderer';
import DefaultItemRenderer from './ItemRenderer';

import { defaultItemSettings } from '../defaultSettings';

import count from '../utils/count';
import { map, filter } from '../utils/iterate';
import StyledContainer from './ConfigList.styled';

export default class ConfigList extends PureComponent {
    static itemsShape = itemsShape;
    static settingsShape = settingsShape;

    static propTypes = {
        className: PropTypes.string,
        availableItems: itemsShape,
        configuredItems: itemsShape,
        SelectRenderer: PropTypes.func,
        ListRenderer: PropTypes.func,
        ItemRenderer: PropTypes.func,
        ItemValueRenderer: PropTypes.func,
        ItemEditor: PropTypes.func,
        //
        editable: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        removable: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        //
        onAddItem: PropTypes.func,
        onEditItem: PropTypes.func,
        onRemoveItem: PropTypes.func,
        //
        confirmRemove: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        //
        selectSettings: settingsShape,
        listSettings: settingsShape
    };
    static defaultProps = {
        selectSettings: defaultItemSettings,
        listSettings: defaultItemSettings,
        SelectRenderer: DefaultSelectRenderer,
        ListRenderer: DefaultListRenderer,
        ItemRenderer: DefaultItemRenderer
    };
    state = {
        removing: {},
        editing: {}
    };

    getSettings = memoize((defaults, settings) => ({ ...defaults, ...settings }));

    get listSettings() {
        return this.getSettings(defaultItemSettings, this.props.listSettings);
    }
    get selectSettings() {
        return this.getSettings(defaultItemSettings, this.props.selectSettings);
    }

    constructor(props, context) {
        super(props, context);
        bind(this);
    }
    render() {
        const { listSettings, selectSettings } = this;
        const {
            availableItems,
            configuredItems,
            className,
            editable,
            removable,
            SelectRenderer,
            ListRenderer,
            ItemRenderer,
            ItemValueRenderer,
            onAddItem
        } = this.props;

        const hasConfiguredItems = count(configuredItems) > 0;

        return (
            <StyledContainer className={cx('ConfigList', className)}>
                <SelectRenderer
                    settings={selectSettings}
                    availableItems={availableItems}
                    configuredItems={configuredItems}
                    onAddItem={onAddItem}
                    parentProps={this.props}
                />
                {hasConfiguredItems && (
                    <ListRenderer
                        availableItems={availableItems}
                        configuredItems={configuredItems}
                        settings={this.listSettings}
                        parentProps={this.props}
                    >
                        {map(filter(configuredItems, listSettings.filter), item => {
                            const key = listSettings.key(item);
                            return (
                                <ItemRenderer
                                    settings={listSettings}
                                    editable={editable}
                                    removable={removable}
                                    ItemValueRenderer={ItemValueRenderer}
                                    key={key}
                                    item={item}
                                    parentProps={this.props}
                                    // removing
                                    isRemoving={!!this.state.removing[key]}
                                    onRemove={this.handleRemove}
                                    onRemoveConfirm={this.handleRemoveConfirm}
                                    onRemoveCancel={this.handleRemoveCancel}
                                    // editing
                                    isEditing={!!this.state.editing[key]}
                                    onEdit={this.handleEdit}
                                    onEditConfirm={this.handleEditConfirm}
                                    onEditCancel={this.handleEditCancel}
                                    editor={this.renderItemEditor(item)}
                                />
                            );
                        })}
                    </ListRenderer>
                )}
            </StyledContainer>
        );
    }

    renderItemEditor(item) {
        const { ItemEditor } = this.props;
        const key = this.listSettings.key(item);

        if (!this.state.editing[key]) {
            // not currently editing
            return null;
        }

        let editorContent = null;
        if (ItemEditor) {
            editorContent = (
                <ItemEditor
                    key={`editor-${key}`}
                    item={item}
                    parentProps={this.props}
                    onEditConfirm={this.handleEditConfirm}
                    onEditCancel={this.handleEditCancel}
                />
            );
        } else {
            editorContent = (
                <div>
                    No <code>ItemEditor</code> provided
                </div>
            );
        }

        return editorContent;
    }

    // -------------------------------------------------
    //
    //          EDIT ITEM
    //
    // -------------------------------------------------

    handleEdit({ item }) {
        this.setState({ editing: { ...this.state.editing, [this.listSettings.key(item)]: true } });
    }

    handleEditCancel({ item }) {
        this.setState({ editing: { ...this.state.editing, [this.listSettings.key(item)]: false } });
    }

    handleEditConfirm({ item, data }) {
        this.setState({ editing: { ...this.state.editing, [this.listSettings.key(item)]: false } });
        if (!this.props.onEditItem) {
            return;
        }
        this.props.onEditItem({ item, data, event });
    }

    // -------------------------------------------------
    //
    //          REMOVE ITEM
    //
    // -------------------------------------------------

    handleRemove({ item, event }) {
        let confirmRemove = this.props.confirmRemove;
        if (typeof confirmRemove === 'function') {
            confirmRemove = confirmRemove({ item, event });
        }
        if (confirmRemove) {
            this.setState({ removing: { ...this.state.removing, [this.listSettings.key(item)]: true } });
        } else if (this.props.onRemoveItem) {
            this.props.onRemoveItem({ item, event });
        }
    }

    handleRemoveCancel({ item }) {
        this.setState({ removing: { ...this.state.removing, [this.listSettings.key(item)]: false } });
    }

    handleRemoveConfirm({ item }) {
        this.setState({ removing: { ...this.state.removing, [this.listSettings.key(item)]: false } });
        if (!this.props.onRemoveItem) {
            return;
        }
        this.props.onRemoveItem({ item, event });
    }
}
