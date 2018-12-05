import PropTypes from 'prop-types';

import { settings } from '@loopmode/config-list/lib/shapes';

export const columnShape = PropTypes.shape({
    field: PropTypes.string,
    label: PropTypes.string
});
export const listSettingsShape = PropTypes.shape({
    ...settings,
    columns: PropTypes.arrayOf(columnShape)
});

export const selectSettingsShape = PropTypes.shape({
    ...settings,
    dropdownIcon: PropTypes.string,
    dropdownText: PropTypes.string,
    dropdownEmptyText: PropTypes.string
});
