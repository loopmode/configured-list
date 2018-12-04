import PropTypes from 'prop-types';

import { settings } from '@loopmode/config-list/lib/shapes';

export const columnShape = PropTypes.shape({
    field: PropTypes.string,
    label: PropTypes.string
});
export const settingsShape = PropTypes.shape({
    ...settings,
    columns: PropTypes.arrayOf(columnShape)
});