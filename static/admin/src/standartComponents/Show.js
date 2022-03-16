import * as React from 'react';
import { Show, SimpleShowLayout, TextField, RichTextField } from 'react-admin';

export const PostShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="teaser" />
      <RichTextField source="body" />
    </SimpleShowLayout>
  </Show>
);
