import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ItemSettingsShape, SupportedItemsShape } from '../../utils/shapes';
import bind from '../../utils/bind';
import cx from 'classnames';

import DefaultSelectRenderer from './SelectRenderer';
import DefaultListRenderer from './ListRenderer';
import DefaultItemRenderer from './ItemRenderer';
import DataAdapter from './DataAdapter';

export const defaultItemSettings = {
    getLabel: item => item.label,
    getID: item => item.id,
    getKey: item => item.id,
    isEditable: () => true,
    isRemovable: () => true
};

export default class ConfigList extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        items: SupportedItemsShape,
        configuredItems: SupportedItemsShape,
        SelectRenderer: PropTypes.func,
        ListRenderer: PropTypes.func,
        ItemRenderer: PropTypes.func,
        ItemEditor: PropTypes.func,
        //
        itemSettings: ItemSettingsShape,
        //
        onAddItem: PropTypes.func,
        onEditItem: PropTypes.func,
        onRemoveItem: PropTypes.func,
        //
        confirmRemove: PropTypes.bool
    };
    static defaultProps = {
        SelectRenderer: DefaultSelectRenderer,
        ListRenderer: DefaultListRenderer,
        ItemRenderer: DefaultItemRenderer,
        itemSettings: defaultItemSettings
    };
    state = {
        removing: {},
        editing: {}
    };
    constructor(props, context) {
        super(props, context);
        bind(this);
    }
    render() {
        const { className, items, configuredItems, SelectRenderer, ListRenderer, ItemRenderer, onAddItem } = this.props;

        const hasConfiguredItems = configuredItems && configuredItems.length > 0;

        return (
            <DataAdapter items={items} itemSettings={this.props.itemSettings}>
                {({ items }) => (
                    <div className={cx('ConfigList', className)}>
                        <SelectRenderer
                            items={items}
                            configuredItems={configuredItems}
                            onAddItem={onAddItem}
                            parentProps={this.props}
                        />
                        {hasConfiguredItems && (
                            <ListRenderer items={items} configuredItems={configuredItems} parentProps={this.props}>
                                {configuredItems.map(item => {
                                    const editorData = this.state.editing[item.key];
                                    const isRemoving = !!this.state.removing[item.key];
                                    const isEditing = !!editorData;
                                    return (
                                        <ItemRenderer
                                            key={item.key}
                                            item={item}
                                            parentProps={this.props}
                                            // removing
                                            isRemoving={isRemoving}
                                            onRemove={this.handleRemove}
                                            onRemoveConfirm={this.handleRemoveConfirm}
                                            onRemoveCancel={this.handleRemoveCancel}
                                            // editing
                                            isEditing={isEditing}
                                            onEdit={this.handleEdit}
                                            onEditConfirm={this.handleEditConfirm}
                                            onEditCancel={this.handleEditCancel}
                                            editor={this.renderItemEditor(item)}
                                        />
                                    );
                                })}
                            </ListRenderer>
                        )}
                    </div>
                )}
            </DataAdapter>
        );
    }

    renderItemEditor(item) {
        const { ItemEditor } = this.props;
        const editorData = this.state.editing[item.key];

        if (!editorData) {
            return null;
        }

        let editorContent = null;
        if (ItemEditor) {
            editorContent = (
                <ItemEditor
                    key={item.key}
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
        this.setState({ editing: { ...this.state.editing, [item.key]: true } });
    }

    handleEditCancel({ item }) {
        this.setState({ editing: { ...this.state.editing, [item.key]: false } });
    }

    handleEditConfirm({ item, data }) {
        this.setState({ editing: { ...this.state.editing, [item.key]: false } });
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
        if (this.props.confirmRemove) {
            this.setState({ removing: { ...this.state.removing, [item.key]: true } });
        } else if (this.props.onRemoveItem) {
            this.props.onRemoveItem({ item, event });
        }
    }

    handleRemoveCancel({ item }) {
        this.setState({ removing: { ...this.state.removing, [item.key]: false } });
    }

    handleRemoveConfirm({ item }) {
        this.setState({ removing: { ...this.state.removing, [item.key]: false } });
        if (!this.props.onRemoveItem) {
            return;
        }
        this.props.onRemoveItem({ item, event });
    }
}