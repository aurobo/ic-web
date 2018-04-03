import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import introduction from './markdown/introduction.md';
import Notes from './Notes';

import { Button } from '@storybook/react/demo';

storiesOf('Documentation', module).add('Introduction', () => <Notes html={introduction} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
