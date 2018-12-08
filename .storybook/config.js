import { configure } from '@storybook/react';

function loadStories() {
    require('../stories/Index.js');
}

configure(loadStories, module);